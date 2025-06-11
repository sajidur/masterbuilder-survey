import { SubSubItemDto } from './subSubItem.dto';
export declare class FieldDto {
    id: number;
    name: string;
    subSubItemId: number;
    subSubItem?: SubSubItemDto | null;
}
export declare class CreateFieldDto {
    name: string;
    subSubItemId: number;
}
