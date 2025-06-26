import { SubSubSubItemDto } from './subsubsubitem.dto';
export declare class FieldDto {
    id: string;
    name: string;
    fieldGroup: string;
    subSubSubItemId: string;
    subSubSubItem?: SubSubSubItemDto | null;
}
export declare class CreateFieldDto {
    name: string;
    fieldGroup: string;
    subSubSubItemId: string;
}
