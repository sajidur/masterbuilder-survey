import { CreateOptionDto } from "./create-option.dto";
export declare class CreateQuestionModelDto {
    text: string;
    type: 'single' | 'multiple';
    required: boolean;
    options: CreateOptionDto[];
}
