import { CreateOptionDto } from "./create-option.dto";
import { CreateQuestionModelDto } from "./create-question-model.dto";
export declare class CreateQuestionDto {
    text: string;
    type: 'single' | 'multiple';
    required: boolean;
    answer?: string;
    options: CreateOptionDto[];
    questionModels?: CreateQuestionModelDto[];
}
