/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
import { ItemDto } from './item.dto';
import { SubItemDto } from './subiItem.dto';
import { SubSubItemDto } from './subSubItem.dto';
export class FieldDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  tier:string;
  fieldGroupCode: string;
  Item?: ItemDto | null;
  subItem?: SubItemDto | null;
  subSubItem?: SubSubItemDto | null;
  subSubSubItem?: SubSubSubItemDto | null;
}

export class CreateFieldDto {
  @ApiProperty({ description: 'Remarks of the field' })
  @IsString()
  @IsNotEmpty()
  remarks: string;
  @ApiProperty({ description: 'Serial Number of the field' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;
  @ApiProperty({ description: 'Serial Number of the field' })
  @IsString()
  @IsNotEmpty()
  fieldGroupCode: string;
  @ApiProperty({ description: 'Field Group code Type of the field' })
  @IsString()
  @IsNotEmpty()
  displayType: string;
   @ApiProperty({ description: 'Tier of the field' })
  @IsString()
  @IsNotEmpty()
  tier: string;
 @ApiProperty({ description: 'Item ID' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ description: 'Sub Item ID', required: false })
  @IsString()
  @IsOptional()
  subItemId?: string;

  @ApiProperty({ description: 'Sub Sub Item ID', required: false })
  @IsString()
  @IsOptional()
  subSubItemId?: string;

  @ApiProperty({ description: 'Sub Sub Sub Item ID', required: false })
  @IsString()
  @IsOptional()
  subSubSubItemId?: string;
}
