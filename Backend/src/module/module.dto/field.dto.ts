/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { SubSubItemDto } from './subSubItem.dto'; // Adjust path as needed
export class FieldDto {
 
  id: number;
  name: string;
  subSubItemId: number;
  subSubItem?: SubSubItemDto | null;
}
export class CreateFieldDto {
  @ApiProperty({ description: 'Name of the field' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'SubSubItem ID' })
  @IsNumber()
  subSubItemId: number;
}
