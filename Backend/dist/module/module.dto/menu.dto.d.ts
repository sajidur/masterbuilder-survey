import { AppDto } from './App.dto';
export declare class CreateMenuDto {
    title: string;
    appId: string;
}
export declare class MenuDto {
    id: string;
    title: string;
    app: AppDto | null;
}
