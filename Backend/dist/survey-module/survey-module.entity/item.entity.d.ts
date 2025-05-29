import { Menu } from '../survey-module.entity/menu.entity';
import { SubItem } from '../survey-module.entity/subitem.entity';
export declare class Item {
    id: number;
    name: string;
    menuId: number;
    menu: Menu;
    subItems: SubItem[];
}
