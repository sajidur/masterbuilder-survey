import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
export declare class DesignDefinitionService {
    private readonly designDefRepo;
    constructor(designDefRepo: Repository<DesignDefinition>);
}
