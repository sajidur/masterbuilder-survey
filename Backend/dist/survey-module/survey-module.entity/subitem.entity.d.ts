import { Item } from '../survey-module.entity/item.entity';
import { Field } from '../survey-module.entity/field.entity';
export declare class SubItem {
    id: number;
    label: string;
    itemId?: number;
    item: Item;
    fields: Field[];
}
