import { Question } from './question.entity';
import { Option } from './option.entity';
import { Answer } from './answer.entity';
export declare class QuestionModel {
    id: string;
    text: string;
    type: 'single' | 'multiple';
    required: boolean;
    parentQuestion: Question;
    options: Option[];
    answers: Answer[];
}
