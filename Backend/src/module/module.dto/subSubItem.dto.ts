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
  subItemId?: string;
  subItem?: SubItemDto | null;
  template?: Template | null;
}
export class CreateSubSubItemDto {
  @ApiProperty({ description: 'Label of the subsubitem' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Tier of the SubSubItem' })
  @IsString()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the SubSubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'Template of the SubItem' })
  @IsString()
  templateId: string;
  @ApiPropertyOptional({ description: 'SubItem ID' })
  @IsString()
  @IsOptional()
  subItemId?: string;
}
