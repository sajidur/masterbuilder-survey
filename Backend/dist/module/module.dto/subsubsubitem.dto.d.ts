import { SubSubItemDto } from './subSubItem.dto';
import { Template } from 'src/Template/entity/template';
export declare class CreateSubSubSubItemDto {
    name: string;
    tier: string;
    layout: string;
    serialNumber: string;
    templateId?: string | null;
    templateText?: string | null;
    subSubItemId?: string;
}
export declare class SubSubSubItemDto {
    id: string;
    name: string;
    tier: string;
    templateText?: string | null;
    userId: string;
    subSubItemId?: string;
    subSubItem?: SubSubItemDto | null;
    serialNumber: string;
    layout: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    template?: Template | null;
}
