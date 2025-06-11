import { Item } from './item.entity';
import { App } from './app.entity';
export declare class Menu {
    id: number;
    title: string;
    appId: number;
    app: App;
    items: Item[];
}
