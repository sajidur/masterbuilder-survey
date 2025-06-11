import { ItemDto } from './item.dto';
export declare class SubItemDto {
    id: string;
    name: string;
    itemId: string;
    item?: ItemDto | null;
}
export declare class CreateSubItemDto {
    name: string;
    itemId?: string;
}
