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
exports.ErpModuleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const erp_module_entity_1 = require("./erp.entity/erp-module.entity");
const typeorm_2 = require("typeorm");
let ErpModuleService = class ErpModuleService {
    erpRepo;
    constructor(erpRepo) {
        this.erpRepo = erpRepo;
    }
    async findAll() {
        return this.erpRepo.find();
    }
    async findOne(id) {
        return this.erpRepo.findOne({ where: { id } });
    }
    async create(module) {
        return this.erpRepo.save(module);
    }
    async update(id, updated) {
        const existing = await this.erpRepo.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
        const merged = this.erpRepo.merge(existing, updated);
        return this.erpRepo.save(merged);
    }
    async delete(id) {
        const result = await this.erpRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
    }
};
exports.ErpModuleService = ErpModuleService;
exports.ErpModuleService = ErpModuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(erp_module_entity_1.ErpModule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ErpModuleService);
//# sourceMappingURL=erp-module.service.js.map