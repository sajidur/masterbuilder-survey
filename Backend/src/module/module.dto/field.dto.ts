/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
export class FieldDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  tier:string;
  fieldGroupCode: string;
  subSubSubItemId?: string;
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
  @ApiProperty({ description: 'SubSubSubItem ID' })
  @IsString()
  @IsNotEmpty()
  subSubSubItemId: string;
}
