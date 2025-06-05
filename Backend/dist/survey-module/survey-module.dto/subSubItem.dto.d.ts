import { SubItemDto } from "../survey-module.dto/subiItem.dto";
export declare class SubSubItemDto {
    id: number;
    label: string;
    subItemId?: number;
    subItem?: SubItemDto | null;
}
export declare class CreateSubSubItemDto {
    label: string;
    subItemId?: number;
}
