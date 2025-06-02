/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
//import { Modules } from "../survey-module.entity/modules.entity";

// menu.dto.ts

import { AppDto } from '../survey-module.dto/App.dto';


import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';



export class CreateMenuDto {
  @ApiProperty({ description: 'Title of the menu' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'App ID' })
  @IsNumber()
  appId: number;

  

}

export class MenuDto {
  id: number;
  title: string;
  app: AppDto|null;
 
}

