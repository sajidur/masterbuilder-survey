import { Item } from '../survey-module.entity/item.entity';
import { SubSubItem } from './subsubitem.entity';
export declare class SubItem {
    id: number;
    label: string;
    itemId?: number;
    item: Item;
    subSubItems: SubSubItem[];
}
