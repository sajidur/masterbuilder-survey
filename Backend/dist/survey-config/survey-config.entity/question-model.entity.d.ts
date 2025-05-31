import { Question } from './question.entity';
import { Option } from './option.entity';
export declare class QuestionModel {
    id: string;
    text: string;
    type: 'single' | 'multiple';
    required: boolean;
    parentQuestionId: string;
    parentQuestion: Question;
    options: Option[];
}
