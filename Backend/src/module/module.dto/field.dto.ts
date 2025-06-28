/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,IsBoolean} from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
export class FieldDto {
 
  id: string;
  name: string;
  fieldGroup: string;
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

  @ApiProperty({ description: 'Field Group of the field' })
  @IsString()
  @IsNotEmpty()
  fieldGroup: string;

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

  @ApiProperty({ description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
