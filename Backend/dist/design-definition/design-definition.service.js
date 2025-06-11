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
const app_entity_1 = require("../module/module.entity/app.entity");
const field_entity_1 = require("../module/module.entity/field.entity");
const item_entity_1 = require("../module/module.entity/item.entity");
const menu_entity_1 = require("../module/module.entity/menu.entity");
const modules_entity_1 = require("../module/module.entity/modules.entity");
const subitem_entity_1 = require("../module/module.entity/subitem.entity");
let DesignDefinitionService = class DesignDefinitionService {
    designDefRepo;
    modulesRepository;
    appRepository;
    menuRepository;
    itemRepository;
    subItemRepository;
    fieldRepository;
    subSubItemRepository;
    constructor(designDefRepo, modulesRepository, appRepository, menuRepository, itemRepository, subItemRepository, fieldRepository, subSubItemRepository) {
        this.designDefRepo = designDefRepo;
        this.modulesRepository = modulesRepository;
        this.appRepository = appRepository;
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
        this.subItemRepository = subItemRepository;
        this.fieldRepository = fieldRepository;
        this.subSubItemRepository = subSubItemRepository;
    }
    async findByContentTypeIdAndName(contentTypeId, contentTypeName) {
        const sources = [
            { repo: this.modulesRepository, name: 'Modules' },
            { repo: this.appRepository, name: 'App' },
            { repo: this.menuRepository, name: 'Menu' },
            { repo: this.itemRepository, name: 'Item' },
            { repo: this.subItemRepository, name: 'SubItem' },
            { repo: this.fieldRepository, name: 'Field' },
            { repo: this.subSubItemRepository, name: 'SubSubItem' },
        ];
        for (const source of sources) {
            const match = await source.repo.findOne({
                where: {
                    id: contentTypeId,
                    name: contentTypeName,
                },
            });
            if (match) {
                return { source: source.name, data: match };
            }
        }
        throw new common_1.NotFoundException(`No entity found with id = ${contentTypeId} and name = ${contentTypeName}`);
    }
    async create(dto) {
        await this.findByContentTypeIdAndName(dto.contentTypeId, dto.contentTypeName);
        const designDefinition = this.designDefRepo.create({
            type: dto.type,
            title: dto.title,
            content: dto.content,
            imageUrl: dto.imageUrl,
            notes: dto.notes,
            contentTypeId: dto.contentTypeId,
            contentTypeName: dto.contentTypeName,
            fileType: dto.fileType,
        });
        const saved = await this.designDefRepo.save(designDefinition);
        return {
            id: saved.id,
            type: saved.type,
            title: saved.title,
            content: saved.content,
            imageUrl: saved.imageUrl,
            notes: saved.notes,
            contentTypeId: saved.contentTypeId,
            contentTypeName: saved.contentTypeName,
            fileType: saved.fileType,
        };
    }
    async findAll() {
        const data = await this.designDefRepo.find();
        return data.map((designDef) => ({
            id: designDef.id,
            title: designDef.title,
            type: designDef.type,
            content: designDef.content,
            imageUrl: designDef.imageUrl,
            notes: designDef.notes,
            contentTypeId: designDef.contentTypeId,
            contentTypeName: designDef.contentTypeName,
            fileType: designDef.fileType,
        }));
    }
    async findOne(id) {
        const designDef = await this.designDefRepo.findOne({
            where: { id }
        });
        if (!designDef) {
            throw new common_1.NotFoundException(`DesignDefinition with ID ${id} not found`);
        }
        return {
            id: designDef.id,
            title: designDef.title,
            type: designDef.type,
            content: designDef.content,
            imageUrl: designDef.imageUrl,
            notes: designDef.notes,
            contentTypeId: designDef.contentTypeId,
            contentTypeName: designDef.contentTypeName,
            fileType: designDef.fileType,
        };
    }
    async update(id, dto) {
        const designDef = await this.designDefRepo.findOne({ where: { id } });
        if (!designDef) {
            throw new common_1.NotFoundException('DesignDefinition not found');
        }
        Object.assign(designDef, dto);
        const updated = await this.designDefRepo.save(designDef);
        return {
            id: updated.id,
            title: updated.title,
            type: updated.type,
            content: updated.content,
            imageUrl: updated.imageUrl,
            notes: updated.notes,
            contentTypeId: updated.contentTypeId,
            contentTypeName: updated.contentTypeName,
            fileType: updated.fileType,
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
    __param(1, (0, typeorm_1.InjectRepository)(modules_entity_1.Modules)),
    __param(2, (0, typeorm_1.InjectRepository)(app_entity_1.App)),
    __param(3, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __param(4, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __param(5, (0, typeorm_1.InjectRepository)(subitem_entity_1.SubItem)),
    __param(6, (0, typeorm_1.InjectRepository)(field_entity_1.Field)),
    __param(7, (0, typeorm_1.InjectRepository)(subsubitem_entity_1.SubSubItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DesignDefinitionService);
//# sourceMappingURL=design-definition.service.js.map