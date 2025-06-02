import { ItemDto } from './item.dto';
export declare class SubItemDto {
    id: number;
    label: string;
    itemId: string;
    item?: ItemDto | null;
}
