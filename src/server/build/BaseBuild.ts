import { Build } from "../../entities/Build";

export default class BaseBuild {
  id: string;
  name: string;
  price: number;
  subTitle: string;
  imageUrl: string;
  cpuBrand: string;
  gpuBrand: string;
  date: string;
  cpuLabel: string;
  gpuLabel: string;
  constructor(build: Build) {
    const { id, name, price, cpuBrand, gpuBrand, subTitle, imageUrl, date } = build;
    this.id = id;
    this.name = name;
    this.price = price;
    this.subTitle = subTitle;
    this.imageUrl = imageUrl;
    this.cpuBrand = cpuBrand;
    this.gpuBrand = gpuBrand;
    this.date = date;
    this.cpuLabel = build.items.find((item) => item.type === "CPU")?.label;
    this.gpuLabel = build.items.find((item) => item.type === "GPU")?.label;
  }
}
