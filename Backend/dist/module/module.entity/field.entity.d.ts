import { SubSubSubItem } from './subSubSubItem.entity';
export declare class Field {
    id: string;
    name: string;
    subSubSubItemId: string;
    subSubSubItem: SubSubSubItem;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    fieldGroup: string;
}
