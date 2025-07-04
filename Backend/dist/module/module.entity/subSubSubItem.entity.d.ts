import { Field } from './field.entity';
import { SubSubItem } from './subsubitem.entity';
export declare class SubSubSubItem {
    id: string;
    name: string;
    subSubItemId?: string;
    tier: string;
    layout: string;
    serialNumber: string;
    subSubItem: SubSubItem;
    templateId?: string;
    templateText?: string;
    fields: Field[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
