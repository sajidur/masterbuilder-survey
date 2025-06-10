/* eslint-disable prettier/prettier */


import { ApiProperty } from "@nestjs/swagger";
import { ModuleDto } from "./create-module.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AppDto {
  id: number;
  
  name: string;
  
  Module: ModuleDto|null;
}
export class CreateAppDto {


  @ApiProperty({ description: 'Name of the app' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Module ID' })
  @IsNotEmpty()
  @IsNumber()
  moduleId: number;

}
export class UpdateAppDto {

  @ApiProperty({ description: 'Name of the app' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Module ID' })
  @IsNotEmpty()
  @IsNumber()
  moduleId: number;

}