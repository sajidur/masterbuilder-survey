/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';
import { SubSubSubItemDto } from './subsubsubitem.dto';
export class FieldDto {
 
  id: string;
  name: string;
  fieldGroup:string;
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
  fieldGroup:string;

  @ApiProperty({ description: 'SubSubSubItem ID' })
  @IsString()
  subSubSubItemId: string;
}
