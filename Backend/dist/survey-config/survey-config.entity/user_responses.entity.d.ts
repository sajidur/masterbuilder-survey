import { Question } from './question.entity';
import { Option } from './option.entity';
export declare class UserResponse {
    id: string;
    userId: string;
    questionId: string;
    question: Question;
    optionId?: string;
    selectedOption?: Option;
    textAnswer?: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
