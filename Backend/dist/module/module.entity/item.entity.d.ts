import { Menu } from './menu.entity';
import { SubItem } from './subitem.entity';
export declare class Item {
    id: number;
    name: string;
    menuId: number;
    menu: Menu;
    subItems: SubItem[];
}
