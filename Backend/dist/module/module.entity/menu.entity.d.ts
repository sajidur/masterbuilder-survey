import { Item } from './item.entity';
import { App } from './app.entity';
export declare class Menu {
    id: string;
    title: string;
    appId: string;
    app: App;
    items: Item[];
}
