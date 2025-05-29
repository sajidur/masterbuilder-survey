import { ErpModule } from './erp.entity/erp-module.entity';
import { Repository } from 'typeorm';
export declare class ErpModuleService {
    private readonly erpRepo;
    constructor(erpRepo: Repository<ErpModule>);
    findAll(): Promise<ErpModule[]>;
    findOne(id: number): Promise<ErpModule | null>;
    create(module: ErpModule): Promise<ErpModule>;
    update(id: number, updated: ErpModule): Promise<ErpModule>;
    delete(id: number): Promise<void>;
}
