import { SubSubItemDto } from './subSubItem.dto';
import { Template } from 'src/Template/entity/template';
export declare class CreateSubSubSubItemDto {
    name: string;
    tier: string;
    templateId: string;
    userId: string;
    subSubItemId?: string;
    createdBy?: string;
    updatedBy?: string;
}
export declare class SubSubSubItemDto {
    id: string;
    name: string;
    tier: string;
    templateId: string;
    userId: string;
    subSubItemId?: string;
    subSubItem?: SubSubItemDto | null;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    template?: Template | null;
}
