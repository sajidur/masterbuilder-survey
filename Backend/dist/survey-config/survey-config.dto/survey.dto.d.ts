import { CreateQuestionGroupDto } from './create-question-group.dto';
export declare class UpdateSurveyDto {
    title?: string;
    description?: string;
}
export declare class CreateSurveyDto {
    title: string;
    description?: string;
    questionGroups: CreateQuestionGroupDto[];
}
