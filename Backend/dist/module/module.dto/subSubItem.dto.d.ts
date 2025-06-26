import { SubItemDto } from './subiItem.dto';
import { Template } from 'src/Template/entity/template';
export declare class SubSubItemDto {
    id: string;
    name: string;
    subItemId?: string;
    subItem?: SubItemDto | null;
    template?: Template | null;
}
export declare class CreateSubSubItemDto {
    name: string;
    tier: string;
    templateId: string;
    subItemId?: string;
}
