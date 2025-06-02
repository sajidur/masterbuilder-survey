/* eslint-disable prettier/prettier */

import { ModuleDto } from "./create-module.dto";

export class AppDto {
  id: number;

  name: string;
 
  Module: ModuleDto|null;
}