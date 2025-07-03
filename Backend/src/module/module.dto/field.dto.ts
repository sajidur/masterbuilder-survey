/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,IsBoolean} from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
export class FieldDto {
 
  id: string;
  serialNumber:string;
  name: string;
  displayType: string;
  fieldType: string;
  isRequired: boolean;
  subSubSubItemId: string;
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
  @ApiProperty({ description: 'Display Type of the field' })
  @IsString()
  @IsNotEmpty()
  displayType: string;

  @ApiProperty({ description: 'Field Type of the field' })
  @IsString()
  @IsNotEmpty()
  fieldType: string;

  @ApiProperty({ description: 'Is the field required' })
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({ description: 'SubSubSubItem ID' })
  @IsString()
  @IsNotEmpty()
  subSubSubItemId: string;

 
}
