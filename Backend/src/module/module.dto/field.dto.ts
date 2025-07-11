/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
export class FieldDto {
  id: string;
  serialNumber: string;
  name: string;
  displayType: string;
  dataType: string;
  tier:string;
  description: string;
  fieldGroupCode: string;
  isRequired: boolean;
  isHide:boolean;
  subSubSubItemId?: string;
  subSubSubItem?: SubSubSubItemDto | null;
}

export class CreateFieldDto {
  @ApiProperty({ description: 'Name of the field' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Serial Number of the field' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;
  // @ApiProperty({ description: 'Description of the field' })
  // @IsString()
  // @IsNotEmpty()
  // description: string;
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
  @ApiProperty({ description: 'Data Type of the field' })
  @IsString()
  @IsNotEmpty()
  dataType: string;
  @ApiProperty({ description: 'Is the field required' })
  @IsBoolean()
  isRequired: boolean;
   @ApiProperty({ description: 'Is the field hidden' })
  @IsBoolean()
  isHide: boolean;
  @ApiProperty({ description: 'SubSubSubItem ID' })
  @IsString()
  @IsNotEmpty()
  subSubSubItemId: string;
}
