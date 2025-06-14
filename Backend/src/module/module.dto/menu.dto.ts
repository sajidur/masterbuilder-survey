/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
//import { Modules } from "../survey-module.entity/modules.entity";

// menu.dto.ts

import { AppDto } from './App.dto';


import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';



export class CreateMenuDto {
  @ApiProperty({ description: 'Title of the menu' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'App ID' })
  @IsString()
  appId: string;

  

}

export class MenuDto {
  id: string;
  title: string;
  app: AppDto|null;
 
}

