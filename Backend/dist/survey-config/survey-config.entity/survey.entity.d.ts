import { QuestionGroup } from './questionGroup.entity';
export declare class Survey {
    id: string;
    title: string;
    description?: string;
    questionGroups: QuestionGroup[];
}
