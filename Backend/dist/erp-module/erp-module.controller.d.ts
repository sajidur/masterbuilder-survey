import { ErpModuleService } from './erp-module.service';
import { ErpModule } from './erp.entity/erp-module.entity';
export declare class ErpModuleController {
    private readonly erpModuleService;
    constructor(erpModuleService: ErpModuleService);
    findAll(): Promise<ErpModule[]>;
    findOne(id: number): Promise<ErpModule>;
    create(module: ErpModule): Promise<ErpModule>;
    update(id: number, module: ErpModule): Promise<ErpModule>;
    delete(id: number): Promise<void>;
}
