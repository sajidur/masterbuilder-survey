import { SubSubItem } from 'src/survey-module/survey-module.entity/subsubitem.entity';
import { Answer } from '../survey-config.entity/answer.entity';
export declare class CreateSubSubItemAnswerDto {
    subSubItemId: number;
    answerId: string;
}
export declare class SubSubItemAnswerResponseDto {
    id: number;
    subSubItem: SubSubItem;
    answer: Answer;
    createdAt: Date;
    updatedAt: Date;
}
