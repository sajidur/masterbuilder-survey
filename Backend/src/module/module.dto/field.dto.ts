/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';
import { SubSubItemDto } from './subSubItem.dto'; // Adjust path as needed
export class FieldDto {
 
  id: string;
  name: string;
  subSubItemId: string;
  subSubItem?: SubSubItemDto | null;
}
export class CreateFieldDto {
  @ApiProperty({ description: 'Name of the field' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'SubSubItem ID' })
  @IsString()
  subSubItemId: string;
}
