export declare class CreateAnswerDto {
    userId: string;
    text?: string;
    selectedOptionIds?: string[];
    questionId?: string;
    questionModelId?: string;
}
export declare class UpdateAnswerDto {
    userId?: string;
    text?: string;
    selectedOptionIds?: string[];
    questionId?: string;
    questionModelId?: string;
}
