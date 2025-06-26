import { Modules } from './modules.entity';
import { Menu } from './menu.entity';
export declare class App {
    id: string;
    name: string;
    tier: string;
    moduleId: string;
    module: Modules;
    menus: Menu[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
