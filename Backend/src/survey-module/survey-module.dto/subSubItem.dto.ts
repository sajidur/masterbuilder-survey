/* eslint-disable prettier/prettier */
import { SubItemDto } from "../survey-module.dto/subiItem.dto";

export class SubSubItemDto {
  id: number;
  label: string;
  subItemId?: string;   
  subItem?: SubItemDto | null;
  
}
