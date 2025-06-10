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
exports.DesignDefinitionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subsubitem_entity_1 = require("../module/module.entity/subsubitem.entity");
const typeorm_2 = require("typeorm");
const design_definition_entity_1 = require("./design-defination.entity/design-definition.entity");
let DesignDefinitionService = class DesignDefinitionService {
    designDefRepo;
    subSubItemRepo;
    constructor(designDefRepo, subSubItemRepo) {
        this.designDefRepo = designDefRepo;
        this.subSubItemRepo = subSubItemRepo;
    }
    async create(dto) {
        const subSubItem = await this.subSubItemRepo.findOne({
            where: { id: dto.subSubItemId },
        });
        if (!subSubItem) {
            throw new common_1.NotFoundException('SubSubItem not found');
        }
        const designDef = this.designDefRepo.create({
            ...dto,
            subSubItemId: subSubItem.id,
        });
        const savedDesign = await this.designDefRepo.save(designDef);
        return {
            id: savedDesign.id,
            title: savedDesign.title,
            type: savedDesign.type,
            content: savedDesign.content,
            imageUrl: savedDesign.imageUrl,
            notes: savedDesign.notes,
            subSubItem: subSubItem,
        };
    }
    async findAll() {
        const data = await this.designDefRepo.find();
        return Promise.all(data.map(async (designDef) => {
            const subSubItem = await this.subSubItemRepo.findOne({
                where: { id: designDef.subSubItemId },
            });
            return {
                id: designDef.id,
                title: designDef.title,
                type: designDef.type,
                content: designDef.content,
                imageUrl: designDef.imageUrl,
                notes: designDef.notes,
                subSubItem: subSubItem,
            };
        }));
    }
    async findOne(id) {
        const designDef = await this.designDefRepo.findOne({
            where: { id },
            relations: ['subSubItem'],
        });
        if (!designDef) {
            throw new common_1.NotFoundException(`DesignDefinition with ID ${id} not found`);
        }
        const subSubItem = await this.subSubItemRepo.findOne({
            where: { id: designDef.subSubItemId },
        });
        if (!subSubItem) {
            throw new common_1.NotFoundException('SubSubItem not found');
        }
        return {
            id: designDef.id,
            title: designDef.title,
            type: designDef.type,
            content: designDef.content,
            imageUrl: designDef.imageUrl,
            notes: designDef.notes,
            subSubItem: subSubItem,
        };
    }
    async update(id, dto) {
        const designDef = await this.designDefRepo.findOne({
            where: { id }
        });
        if (!designDef) {
            throw new common_1.NotFoundException('DesignDefinition not found');
        }
        const subSubItem = await this.subSubItemRepo.findOne({
            where: { id: designDef.subSubItemId },
        });
        if (!subSubItem) {
            throw new common_1.NotFoundException('SubSubItem not found');
        }
        designDef.subSubItemId = subSubItem.id;
        Object.assign(designDef, dto);
        const updated = await this.designDefRepo.save(designDef);
        return {
            id: updated.id,
            title: updated.title,
            type: updated.type,
            content: updated.content,
            imageUrl: updated.imageUrl,
            notes: updated.notes,
            subSubItem: subSubItem
        };
    }
    async remove(id) {
        const designDef = await this.designDefRepo.findOne({
            where: { id }
        });
        if (designDef) {
            await this.designDefRepo.remove(designDef);
        }
    }
};
exports.DesignDefinitionService = DesignDefinitionService;
exports.DesignDefinitionService = DesignDefinitionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(design_definition_entity_1.DesignDefinition)),
    __param(1, (0, typeorm_1.InjectRepository)(subsubitem_entity_1.SubSubItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DesignDefinitionService);
//# sourceMappingURL=design-definition.service.js.map