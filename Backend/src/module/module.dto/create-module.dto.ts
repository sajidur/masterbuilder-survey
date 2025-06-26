/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateModuleDto {
  @ApiProperty({ description: 'Name of the module' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tier of the module' })
  @IsString()
  tier: string;

}
export class UpdateModuleDto {
 
  @IsString()
   @ApiProperty({ description: 'Name of the module' })
  name?: string;
 @ApiProperty({ description: 'Tier of the module' })
  @IsString()
  tier: string;

}
export class ModuleDto {
  id: string;
  name: string;
}

