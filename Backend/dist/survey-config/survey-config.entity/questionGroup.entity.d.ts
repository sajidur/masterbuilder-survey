import { SurveyConfig } from './survey-config.entity';
import { Question } from './question.entity';
export declare class QuestionGroup {
    id: string;
    title: string;
    description: string;
    surveyConfigId: string;
    surveyConfig: SurveyConfig;
    questions: Question[];
}
