/* eslint-disable prettier/prettier */
import { App } from "supertest/types";
import { Modules } from "../survey-module.entity/modules.entity";

export class MenuDto {

  id: number;
  title: string;
  app: App;
  module:Modules

 
}
