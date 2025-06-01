import { QuestionGroup } from './questionGroup.entity';
import { Option } from './option.entity';
import { QuestionModel } from './question-model.entity';
export declare class Question {
    id: string;
    text: string;
    answer?: string;
    type: 'single' | 'multiple';
    required: boolean;
    questionGroup: QuestionGroup;
    options: Option[];
    questionModels: QuestionModel[];
}
