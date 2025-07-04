/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto'; // Make sure this import path is correct
import { Template } from 'src/Template/entity/template';
export class SubItemDto {
  id: string;
  name: string;
  tier: string;
  serialNumber: string;
  layout: string;
  buttonType: string;
  navigationTo: string;
  description: string;
  itemId: string;
  item?: ItemDto | null;
  templateText?:string|null;
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
  @ApiProperty({ description: 'layout/Placement of the SubItem' })
  @IsString()
  layout: string;

  @ApiProperty({ description: 'serialNumber of the SubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'buttonType of the SubItem' })
  @IsString()
  buttonType: string;
  @ApiProperty({ description: 'navigationTo of the SubItem' })
  @IsString()
  navigationTo: string;
  @ApiProperty({ description: 'Description of the SubItem' })
  @IsString()
  description: string;
  @ApiProperty({ description: 'Template ID of the SubItem', required: false, nullable: true })
  @IsOptional()
  @IsString()
  templateId?: string | null;

  @ApiProperty({ description: 'Template of text box of the SubItem', required: false, nullable: true })
  @IsOptional()
  @IsString()
  templateText?: string | null;
  @ApiPropertyOptional({ description: 'Item ID' })
  @IsString()
  @IsOptional()
  itemId?: string;
}
