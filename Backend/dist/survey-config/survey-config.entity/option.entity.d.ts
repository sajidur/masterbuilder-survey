import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
export declare class Option {
    id: string;
    text: string;
    value: string;
    questionId?: string;
    question?: Question;
    questionModelId?: string;
    questionModel?: QuestionModel;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
