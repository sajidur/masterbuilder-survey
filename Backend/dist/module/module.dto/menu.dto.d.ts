import { AppDto } from './App.dto';
export declare class CreateMenuDto {
    title: string;
    appId: number;
}
export declare class MenuDto {
    id: number;
    title: string;
    app: AppDto | null;
}
