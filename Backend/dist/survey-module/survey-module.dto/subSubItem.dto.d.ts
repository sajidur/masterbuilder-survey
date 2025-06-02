import { SubItemDto } from "../survey-module.dto/subiItem.dto";
export declare class SubSubItemDto {
    id: number;
    label: string;
    subItemId?: string;
    subItem?: SubItemDto | null;
}
