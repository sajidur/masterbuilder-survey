import { App } from './app.entity';
export declare class Modules {
    id: string;
    name: string;
    tier: string;
    apps: App[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
