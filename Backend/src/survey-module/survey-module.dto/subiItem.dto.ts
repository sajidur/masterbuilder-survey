/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto'; // Make sure this import path is correct
export class SubItemDto {

  id: number;
  label: string;
  itemId:number;
  item?: ItemDto|null;

}
export class CreateSubItemDto {
  @ApiProperty({ description: 'Label of the subitem' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ description: 'Item ID' })
  @IsNumber()
  @IsOptional()
  itemId?: number;
}
