/* eslint-disable prettier/prettier */
import { SubSubItemDto } from './subSubItem.dto'; // Adjust path as needed
export class FieldDto {
 
  id: number;
  name: string;
  subSubItemId: number;
  subSubItem?: SubSubItemDto | null;
}
