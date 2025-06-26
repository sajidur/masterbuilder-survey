import { Item } from './item.entity';
import { SubSubItem } from './subsubitem.entity';
export declare class SubItem {
    id: string;
    name: string;
    tier: string;
    itemId?: string;
    item: Item;
    subSubItems: SubSubItem[];
    templateId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
