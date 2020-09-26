import { Item } from '../../entities/Item';
import { getRepository } from 'typeorm';
import { extractInfo } from './helpers';

export async function getItemByAsin(ctx) {
  const itemRepository = getRepository(Item);
  const { asin } = ctx.params;
  const item = await itemRepository.findOne(asin);
  if (!item) {
    ctx.status = 404;
    return;
  }
  ctx.body = extractInfo(item);
}
