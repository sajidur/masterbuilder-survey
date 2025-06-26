import { MenuDto } from './menu.dto';
export declare class ItemDto {
    id: string;
    name: string;
    menu: MenuDto | null;
}
export declare class CreateItemDto {
    name: string;
    tier: string;
    menuId: string;
}
