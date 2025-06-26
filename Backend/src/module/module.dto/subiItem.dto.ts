/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto'; // Make sure this import path is correct
import { Template } from 'src/Template/entity/template';
export class SubItemDto {
  id: string;
  name: string;
  itemId: string;
  item?: ItemDto | null;
  template?: Template | null;
}

export class CreateSubItemDto {
  @ApiProperty({ description: 'Label of the subitem' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Tier of the SubItem' })
  @IsString()
  tier: string;
  @ApiProperty({ description: 'Template of the SubItem' })
  @IsString()
  templateId: string;

  @ApiPropertyOptional({ description: 'Item ID' })
  @IsString()
  @IsOptional()
  itemId?: string;
}
