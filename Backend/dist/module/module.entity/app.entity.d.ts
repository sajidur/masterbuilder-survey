import { Modules } from './modules.entity';
import { Menu } from './menu.entity';
export declare class App {
    id: string;
    name: string;
    moduleId: string;
    module: Modules;
    menus: Menu[];
}
