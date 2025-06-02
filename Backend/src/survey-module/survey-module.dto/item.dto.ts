/* eslint-disable prettier/prettier */
import { MenuDto } from './menu.dto';
export class ItemDto {
 
  id: number;
  name: string;
  menu: MenuDto|null;

}
