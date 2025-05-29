import { Item } from '../survey-module.entity/item.entity';
import { App } from '../survey-module.entity/app.entity';
export declare class Menu {
    id: number;
    title: string;
    appId: number;
    app: App;
    items: Item[];
}
