import { SubSubItem } from "src/survey-module/survey-module.entity/subsubitem.entity";
import { Answer } from "./answer.entity";
export declare class SubSubItemAnswer {
    id: number;
    subSubItem: SubSubItem;
    answer: Answer;
    createdAt: Date;
    updatedAt: Date;
}
