export declare class DesignDefinition {
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
