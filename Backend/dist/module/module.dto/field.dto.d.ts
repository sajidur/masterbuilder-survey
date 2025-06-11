import { SubSubItemDto } from './subSubItem.dto';
export declare class FieldDto {
    id: string;
    name: string;
    subSubItemId: string;
    subSubItem?: SubSubItemDto | null;
}
export declare class CreateFieldDto {
    name: string;
    subSubItemId: string;
}
