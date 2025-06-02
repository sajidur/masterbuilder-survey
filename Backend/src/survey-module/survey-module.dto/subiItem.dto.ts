/* eslint-disable prettier/prettier */

import { ItemDto } from './item.dto'; // Make sure this import path is correct
export class SubItemDto {

  id: number;
  label: string;
  itemId:string;
  item?: ItemDto|null;

}
