import { ItemDto } from './item.dto';
import { Template } from 'src/Template/entity/template';
export declare class SubItemDto {
    id: string;
    name: string;
    itemId: string;
    item?: ItemDto | null;
    template?: Template | null;
}
export declare class CreateSubItemDto {
    name: string;
    tier: string;
    templateId: string;
    itemId?: string;
}
