import { SubItem } from './subitem.entity';
import { Field } from './field.entity';
export declare class SubSubItem {
    id: string;
    name: string;
    subItemId?: string;
    tier: string;
    subItem: SubItem;
    templateId: string;
    fields: Field[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    subSubSubItems: any;
}
