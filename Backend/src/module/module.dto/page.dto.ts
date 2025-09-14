/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto'; // Make sure this import path is correct
import { Template } from 'src/Template/entity/template';
import { ButtonGroup } from '../module.entity/item.entity';
export class PageDto {
  id: string;
  name: string;
  tier?: string | null;
  serialNumber: string;
  layout: string;
  buttonType: ButtonGroup;
  buttonLabel: string;
  navigationTo: string;
  description: string;
  itemId: string;
  item?: ItemDto | null;
  templateText?: string | null;
  template?: Template | null;
}

export class CreatePageDto {

  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Tier of the SubItem' })
  @IsString()
  @IsOptional()
  tier: string;
  @ApiPropertyOptional({ description: 'Item ID' })
  @IsString()
  @IsOptional()
  itemId?: string;
  @ApiPropertyOptional({ description: 'userId ID' })
  @IsString()
  @IsOptional()
  userId: string;
  @ApiPropertyOptional({ description: 'serialNumber' })
  @IsString()
  @IsOptional()
  serialNumber: string;
  @ApiPropertyOptional({ description: 'Entry' })
  @IsString()
  @IsOptional()
  Entry?: boolean
  @ApiPropertyOptional({ description: 'View' })
  @IsOptional()
  View?: boolean;
  @ApiPropertyOptional({ description: 'Settings' })
  @IsOptional()
  Settings?: boolean;
  @ApiPropertyOptional({ description: 'BreakPoint' })
  @IsString()
  @IsOptional()
  BreakPoint: string;
  @ApiPropertyOptional({ description: 'description' })
  @IsOptional()
  description: string;
}
