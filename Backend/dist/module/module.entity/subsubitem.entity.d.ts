import { SubItem } from './subitem.entity';
import { Field } from './field.entity';
export declare class SubSubItem {
    id: string;
    name: string;
    subItemId?: string;
    subItem: SubItem;
    fields: Field[];
}
