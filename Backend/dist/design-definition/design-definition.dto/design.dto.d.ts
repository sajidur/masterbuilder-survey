import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
export declare class CreateDesignDefinitionDto {
    subSubItemId: number;
    type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';
    title: string;
    content: any;
    imageUrl?: string;
    notes?: string;
}
export declare class DesignDefinitionResponseDto {
    id: number;
    subSubItem: SubSubItem | null;
    type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';
    title: string;
    content: any;
    imageUrl?: string;
    notes?: string;
}
