import { Modules } from './modules.entity';
import { Menu } from './menu.entity';
export declare class App {
    id: number;
    name: string;
    moduleId: number;
    module: Modules;
    menus: Menu[];
}
