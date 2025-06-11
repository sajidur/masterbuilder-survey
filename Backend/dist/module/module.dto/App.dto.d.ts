import { ModuleDto } from "./create-module.dto";
export declare class AppDto {
    id: string;
    name: string;
    Module: ModuleDto | null;
}
export declare class CreateAppDto {
    name: string;
    moduleId: string;
}
export declare class UpdateAppDto {
    name: string;
    moduleId: string;
}
