import { SubItem } from './subitem.entity';
import { Field } from './field.entity';
export declare class SubSubItem {
    id: number;
    label: string;
    subItemId?: number;
    subItem: SubItem;
    fields: Field[];
}
