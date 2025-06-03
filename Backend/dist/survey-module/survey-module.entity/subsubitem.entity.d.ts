import { SubItem } from '../survey-module.entity/subitem.entity';
import { Field } from '../survey-module.entity/field.entity';
import { SubSubItemAnswer } from 'src/survey-config/survey-config.entity/subSubItemAnswer.entity';
export declare class SubSubItem {
    id: number;
    label: string;
    subItemId?: number;
    subItem: SubItem;
    fields: Field[];
    subSubItemAnswers: SubSubItemAnswer[];
}
