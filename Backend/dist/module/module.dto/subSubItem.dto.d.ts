import { SubItemDto } from "./subiItem.dto";
export declare class SubSubItemDto {
    id: string;
    name: string;
    subItemId?: string;
    subItem?: SubItemDto | null;
}
export declare class CreateSubSubItemDto {
    name: string;
    subItemId?: string;
}
