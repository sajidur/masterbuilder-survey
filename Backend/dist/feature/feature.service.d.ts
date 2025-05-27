import { Feature } from './feature.entity/feature.entity';
import { Repository } from 'typeorm';
export declare class FeatureService {
    private repository;
    constructor(repository: Repository<Feature>);
    findAll(): Promise<Feature[]>;
    findOne(id: number): Promise<Feature>;
    create(user: Partial<Feature>): Promise<Feature>;
    remove(id: number): Promise<void>;
}
