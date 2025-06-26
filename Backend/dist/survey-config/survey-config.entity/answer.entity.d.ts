import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
export declare class Answer {
    id: string;
    text: string | null;
    selectedOptionIds: string[] | null;
    question: Question;
    questionModel: QuestionModel;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
