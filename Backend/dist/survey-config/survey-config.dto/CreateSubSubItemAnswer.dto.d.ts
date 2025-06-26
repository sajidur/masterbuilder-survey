import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Answer } from '../survey-config.entity/answer.entity';
export declare class CreateSubSubItemAnswerDto {
    subSubItemId: string;
    answerId: string;
}
export declare class SubSubItemAnswerResponseDto {
    id: string;
    subSubItem: SubSubItem;
    answer: Answer;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string | null;
    updatedBy?: string | null;
    userId: string;
}
