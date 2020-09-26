import { Item } from "../../entities/Item";
import { ItemDTO } from "./item.dto";

export function extractInfo(item: Item): ItemDTO {
  return {
    asin: item.asin,
    title: item.title,
    label: item.label,
    url: item.url,
    price: item.price,
    warehousePrice: item.warehousePrice,
  };
}
