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
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
