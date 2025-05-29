import { SubItem } from '../survey-module.entity/subitem.entity';
export declare class Field {
    id: number;
    name: string;
    type: string;
    subItemId: number;
    subItem: SubItem;
}
