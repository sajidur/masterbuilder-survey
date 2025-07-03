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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const template_1 = require("../Template/entity/template");
let TemplateService = class TemplateService {
    templateRepo;
    constructor(templateRepo) {
        this.templateRepo = templateRepo;
    }
    async create(dto) {
        console.log(dto);
        const temp = new template_1.Template();
        temp.code = dto.code;
        temp.description = dto.description || null;
        temp.name = dto.name;
        temp.createdAt = new Date();
        temp.updatedAt = new Date();
        console.log(temp);
        const template = this.templateRepo.create(temp);
        console.log(template);
        return this.templateRepo.save(template);
    }
    async findAll() {
        return this.templateRepo.find();
    }
    async findOne(id) {
        const template = await this.templateRepo.findOne({ where: { id } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async update(id, dto) {
        const template = await this.templateRepo.findOne({ where: { id } });
        if (!template) {
            throw new common_1.NotFoundException(`Template with id ${id} not found`);
        }
        template.name = dto.name;
        template.code = dto.code;
        template.description = dto.description || null;
        return await this.templateRepo.save(template);
    }
    async remove(id) {
        const result = await this.templateRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Template not found');
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(template_1.Template)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TemplateService);
//# sourceMappingURL=template.service.js.map