"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErpModuleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const erp_module_entity_1 = require("./erp.entity/erp-module.entity");
const erp_module_service_1 = require("./erp-module.service");
const erp_module_controller_1 = require("./erp-module.controller");
let ErpModuleModule = class ErpModuleModule {
};
exports.ErpModuleModule = ErpModuleModule;
exports.ErpModuleModule = ErpModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([erp_module_entity_1.ErpModule])],
        providers: [erp_module_service_1.ErpModuleService],
        controllers: [erp_module_controller_1.ErpModuleController],
    })
], ErpModuleModule);
//# sourceMappingURL=erp-module.module.js.map