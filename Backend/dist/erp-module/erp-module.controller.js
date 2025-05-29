"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErpModuleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const erp_module_service_1 = require("./erp-module.service");
const erp_module_entity_1 = require("./erp.entity/erp-module.entity");
let ErpModuleController = class ErpModuleController {
    erpModuleService;
    constructor(erpModuleService) {
        this.erpModuleService = erpModuleService;
    }
    findAll() {
        return this.erpModuleService.findAll();
    }
    async findOne(id) {
        const module = await this.erpModuleService.findOne(id);
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
        return module;
    }
    create(module) {
        return this.erpModuleService.create(module);
    }
    update(id, module) {
        return this.erpModuleService.update(id, module);
    }
    delete(id) {
        return this.erpModuleService.delete(id);
    }
};
exports.ErpModuleController = ErpModuleController;
__decorate([
    (0, common_1.Get)('allErpModules'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [erp_module_entity_1.ErpModule] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ErpModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getErpModule:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: erp_module_entity_1.ErpModule }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ErpModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('addErpModule'),
    (0, swagger_1.ApiBody)({ type: erp_module_entity_1.ErpModule }),
    (0, swagger_1.ApiResponse)({ status: 201, type: erp_module_entity_1.ErpModule }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [erp_module_entity_1.ErpModule]),
    __metadata("design:returntype", Promise)
], ErpModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('updateErpModule:id'),
    (0, swagger_1.ApiBody)({ type: erp_module_entity_1.ErpModule }),
    (0, swagger_1.ApiResponse)({ status: 200, type: erp_module_entity_1.ErpModule }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, erp_module_entity_1.ErpModule]),
    __metadata("design:returntype", Promise)
], ErpModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteErpModule:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Module deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ErpModuleController.prototype, "delete", null);
exports.ErpModuleController = ErpModuleController = __decorate([
    (0, swagger_1.ApiTags)('erp-modules'),
    (0, common_1.Controller)('erp-modules'),
    __metadata("design:paramtypes", [erp_module_service_1.ErpModuleService])
], ErpModuleController);
//# sourceMappingURL=erp-module.controller.js.map