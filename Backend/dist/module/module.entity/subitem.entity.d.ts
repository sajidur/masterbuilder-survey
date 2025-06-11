import { Item } from './item.entity';
import { SubSubItem } from './subsubitem.entity';
export declare class SubItem {
    id: string;
    name: string;
    itemId?: string;
    item: Item;
    subSubItems: SubSubItem[];
}
