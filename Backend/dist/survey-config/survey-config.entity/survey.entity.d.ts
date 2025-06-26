import { QuestionGroup } from './questionGroup.entity';
export declare class Survey {
    id: string;
    title: string;
    description?: string;
    questionGroups: QuestionGroup[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
