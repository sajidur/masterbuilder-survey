import { ModuleDto } from "./create-module.dto";
export declare class AppDto {
    id: number;
    name: string;
    Module: ModuleDto | null;
}
export declare class CreateAppDto {
    name: string;
    moduleId: number;
}
export declare class UpdateAppDto {
    name: string;
    moduleId: number;
}
