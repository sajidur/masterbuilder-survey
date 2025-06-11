/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto'; // Make sure this import path is correct
export class SubItemDto {

  id: string;
  name: string;
  itemId:string;
  item?: ItemDto|null;

}
export class CreateSubItemDto {
  @ApiProperty({ description: 'Label of the subitem' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Item ID' })
  @IsString()
  @IsOptional()
  itemId?: string;
}
