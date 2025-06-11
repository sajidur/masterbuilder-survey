import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
export declare class Answer {
    id: string;
    text: string | null;
    selectedOptionIds: string[] | null;
    userId?: string;
    question: Question;
    questionModel: QuestionModel;
}
