/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateModuleDto {
  @ApiProperty({ description: 'Name of the module' })
  @IsString()
  name: string;

}
export class UpdateModuleDto {
 
  @IsString()
   @ApiProperty({ description: 'Name of the module' })
  name?: string;


}
export class ModuleDto {
  id: number;
  name: string;
}

