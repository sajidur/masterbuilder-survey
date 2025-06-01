import { Question } from './question.entity';
import { Survey } from './survey.entity';
export declare class QuestionGroup {
    id: string;
    title: string;
    description: string;
    survey: Survey;
    questions: Question[];
}
