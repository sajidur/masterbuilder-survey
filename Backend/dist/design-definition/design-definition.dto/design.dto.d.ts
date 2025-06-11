export declare class CreateDesignDefinitionDto {
    contentTypeId: string;
    contentTypeName: string;
    fileType: string;
    type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';
    title: string;
    content: any;
    imageUrl?: string;
    notes?: string;
}
export declare class DesignDefinitionResponseDto {
    id: string;
    contentTypeId: string;
    contentTypeName: string;
    fileType: string;
    type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';
    title: string;
    content: any;
    imageUrl?: string;
    notes?: string;
}
