import { Menu } from './menu.entity';
import { SubItem } from './subitem.entity';
export declare class Item {
    id: string;
    name: string;
    menuId: string;
    menu: Menu;
    subItems: SubItem[];
    userId: string;
    tier: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
