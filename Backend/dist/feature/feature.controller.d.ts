import { FeatureService } from './feature.service';
import { Feature } from './feature.entity/feature.entity';
export declare class FeatureController {
    private readonly service;
    constructor(service: FeatureService);
    findAll(): Promise<Feature[]>;
    findOne(id: string): Promise<Feature>;
    create(feature: Partial<Feature>): Promise<Feature>;
    remove(id: string): Promise<void>;
}
