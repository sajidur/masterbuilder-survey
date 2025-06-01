/* eslint-disable prettier/prettier */

import { Modules } from "../survey-module.entity/modules.entity";

export class AppDto {
  id: number;

  name: string;
 
  Module: Modules|null;
}