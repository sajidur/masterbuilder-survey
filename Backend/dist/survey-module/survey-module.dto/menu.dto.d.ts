import { App } from "supertest/types";
import { Modules } from "../survey-module.entity/modules.entity";
export declare class MenuDto {
    id: number;
    title: string;
    app: App;
    module: Modules;
}
