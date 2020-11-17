import { Item } from "../../entities/Item";
import { Build } from "../../entities/Build";
import { getRepository } from "typeorm";
import BaseBuild from "./BaseBuild";
import moment from "moment";

import { createBuildSchema } from "./validation";

export async function createBuild(ctx) {
  const result = createBuildSchema.validate(ctx.request.body, { abortEarly: false });
  if (result.error) {
    ctx.status = 400;
    console.log(result.error.details);
    ctx.body = result;
    return;
  }
  const { name, price, subTitle, imageUrl, cpuBrand, gpuBrand, description, ...components } = ctx.request.body;

  // Check if name is already taken
  const buildRepository = getRepository(Build);
  let build = await buildRepository.findOne({ where: { name: name } });
  if (build) {
    ctx.status = 409;
    ctx.body = `Build con nome ${name} già utilizzato`;
    return;
  }

  // Components have labels, I need to update labels in db to match all labels in components object
  const itemRepository = getRepository(Item);
  let keys: string[] = Object.keys(components);
  const asins: string[] = [];
  const promises = keys.map((key) => {
    const asin: string = components[key].asin;
    const label: string = components[key].label;
    // If no asin is given, ignore component
    if (!asin) return;
    const itemToBeUpdatedOrCreated: Item = new Item();
    itemToBeUpdatedOrCreated.asin = asin;
    itemToBeUpdatedOrCreated.label = label;
    itemToBeUpdatedOrCreated.type = key;
    asins.push(asin);
    return itemRepository.save(itemToBeUpdatedOrCreated);
  });

  // Await untill all promises are resolved
  await Promise.all(promises);

  // All items are now updated with their new labels
  // Retrieve all items that compose current build
  const buildItems = await itemRepository.findByIds(asins);

  // Create build
  build = new Build();
  build.name = name;
  build.imageUrl = imageUrl || "https://i.ytimg.com/vi/DDhmv2uX2Rs/maxresdefault.jpg";
  build.cpuBrand = cpuBrand;
  build.gpuBrand = gpuBrand;
  build.price = price;
  build.subTitle = subTitle;
  build.description = description;
  moment.locale("it");
  build.date = moment().format("LL");
  build.items = buildItems;

  try {
    await buildRepository.save(build);
    ctx.status = 201;
    ctx.body = build;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = error;
    return;
  }
}

export async function updateBuild(ctx) {
  const result = createBuildSchema.validate(ctx.request.body, { abortEarly: false });
  if (result.error) {
    ctx.status = 400;
    console.log(result.error.details);
    ctx.body = result;
    return;
  }
  const { name, price, subTitle, imageUrl, cpuBrand, gpuBrand, description, ...components } = ctx.request.body;

  // Components have labels, I need to update labels in db to match all labels in components object
  const itemRepository = getRepository(Item);
  let keys: string[] = Object.keys(components);
  const asins: string[] = [];
  const promises = keys.map((key) => {
    const asin: string = components[key].asin;
    const label: string = components[key].label;
    // If no asin is given, ignore component
    if (!asin) return;
    const itemToBeUpdatedOrCreated: Item = new Item();
    itemToBeUpdatedOrCreated.asin = asin;
    itemToBeUpdatedOrCreated.label = label;
    itemToBeUpdatedOrCreated.type = key;
    asins.push(asin);
    return itemRepository.save(itemToBeUpdatedOrCreated);
  });

  // Await untill all promises are resolved
  await Promise.all(promises);

  // All items are now updated with their new labels
  // Retrieve all items that compose current build
  let buildItems;
  try {
    buildItems = await itemRepository.findByIds(asins);
  } catch (error) {
    console.log("Error");
  }

  const buildRepository = getRepository(Build);
  // Create build
  const build = new Build();
  build.id = ctx.params.id;
  build.name = name;
  build.imageUrl = imageUrl || "https://i.ytimg.com/vi/DDhmv2uX2Rs/maxresdefault.jpg";
  build.cpuBrand = cpuBrand;
  build.gpuBrand = gpuBrand;
  build.price = price;
  build.subTitle = subTitle;
  build.description = description;
  moment.locale("it");
  build.date = moment().format("LL");
  build.items = buildItems;
  try {
    await buildRepository.save(build);
    ctx.status = 201;
    ctx.body = build;
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = error;
    return;
  }
}

export async function deleteBuild(ctx) {
  const id = ctx.params?.id;
  if (!id) return;
  const buildRepository = getRepository(Build);

  try {
    const build = await buildRepository.findOne(id);
    if (!build) {
      ctx.status = 404;
      return;
    }
    await buildRepository.delete({ id });
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}

export async function getBaseBuildInfo(ctx) {
  const buildRepository = getRepository(Build);
  let builds = await buildRepository.find({ relations: ["items"] });
  ctx.body = builds.map((build) => new BaseBuild(build));
}

export async function getCompleteBuild(ctx) {
  const name = ctx.params?.name;
  if (!name) {
    ctx.status = 400;
    return;
  }
  const buildRepository = getRepository(Build);

  try {
    const build = await buildRepository.findOne({name: name}, { relations: ["items"] });
    build.items.forEach(item => {
      if(item.url) {
        item.url = item.url.replace("hwgrouptech0c-21", "wasabe-21")
      }
    })
    // console.log(build.items)
    if (!build) {
      ctx.body = "Configurazione non trovata";
      ctx.status = 404;
      return;
    }

    ctx.body = build;
    ctx.status = 200;
    return;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
    return;
  }
}
