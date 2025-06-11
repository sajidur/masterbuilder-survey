import { ItemDto } from './item.dto';
export declare class SubItemDto {
    id: number;
    label: string;
    itemId: number;
    item?: ItemDto | null;
}
export declare class CreateSubItemDto {
    label: string;
    itemId?: number;
}
