import { QuestionGroup } from './questionGroup.entity';
export declare class Survey {
    id: number;
    title: string;
    description?: string;
    questionGroups: QuestionGroup[];
}
