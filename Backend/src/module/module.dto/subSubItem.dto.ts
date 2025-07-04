/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { SubItemDto } from './subiItem.dto';
import { Template } from 'src/Template/entity/template';

export class SubSubItemDto {
  id: string;
  name: string;
  tier: string;
  serialNumber: string;
  layout: string;
  templateText?: string | null;
  editButton: string;
  subItemId?: string;
  subItem?: SubItemDto | null;
  template?: Template | null;
}
export class CreateSubSubItemDto {
  @ApiProperty({ description: 'Label of the SubSubItem' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Tier of the SubSubItem' })
  @IsString()
  tier: string;
  @ApiProperty({ description: 'layout/Placement of the SubSubItem' })
  @IsString()
  layout: string;
  @ApiProperty({ description: 'Edit button text of the SubSubItem' })
  @IsString()
  editButton: string;
  @ApiProperty({ description: 'SerialNumber of the SubSubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({
    description: 'Template ID of the SubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateId?: string | null;

  @ApiProperty({
    description: 'Template of text box of the SubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateText?: string | null;
  @ApiPropertyOptional({ description: 'SubSubItem ID' })
  @IsString()
  @IsOptional()
  subItemId?: string;
}
