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
exports.SurveyModuleService = void 0;
const common_1 = require("@nestjs/common");
const modules_entity_1 = require("./survey-module.entity/modules.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const app_entity_1 = require("./survey-module.entity/app.entity");
const menu_entity_1 = require("./survey-module.entity/menu.entity");
const item_entity_1 = require("./survey-module.entity/item.entity");
const subitem_entity_1 = require("./survey-module.entity/subitem.entity");
const field_entity_1 = require("./survey-module.entity/field.entity");
let SurveyModuleService = class SurveyModuleService {
    modulesRepository;
    appRepository;
    menuRepository;
    itemRepository;
    subItemRepository;
    fieldRepository;
    constructor(modulesRepository, appRepository, menuRepository, itemRepository, subItemRepository, fieldRepository) {
        this.modulesRepository = modulesRepository;
        this.appRepository = appRepository;
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
        this.subItemRepository = subItemRepository;
        this.fieldRepository = fieldRepository;
    }
    async findAllFields() {
        return this.fieldRepository.find({ relations: ['subItem'] });
    }
    async findOneField(id) {
        return this.fieldRepository.findOne({ where: { id }, relations: ['subItem'] });
    }
    async createField(field) {
        return this.fieldRepository.save(field);
    }
    async updateField(id, updated) {
        const existing = await this.fieldRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
        const merged = this.fieldRepository.merge(existing, updated);
        return this.fieldRepository.save(merged);
    }
    async deleteField(id) {
        const result = await this.fieldRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
    }
    async findAllSubItems() {
        return this.subItemRepository.find({ relations: ['item', 'fields'] });
    }
    async findOneSubItem(id) {
        return this.subItemRepository.findOne({ where: { id }, relations: ['item', 'fields'] });
    }
    async createSubItem(subItem) {
        return this.subItemRepository.save(subItem);
    }
    async updateSubItem(id, updated) {
        const existing = await this.subItemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
        const merged = this.subItemRepository.merge(existing, updated);
        return this.subItemRepository.save(merged);
    }
    async deleteSubItem(id) {
        const result = await this.subItemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
    }
    async findAllItems() {
        return this.itemRepository.find({ relations: ['menu', 'subItems'] });
    }
    async findOneItem(id) {
        return this.itemRepository.findOne({ where: { id }, relations: ['menu', 'subItems'] });
    }
    async createItem(item) {
        return this.itemRepository.save(item);
    }
    async updateItem(id, updatedItem) {
        const existing = await this.itemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        const merged = this.itemRepository.merge(existing, updatedItem);
        return this.itemRepository.save(merged);
    }
    async deleteItem(id) {
        const result = await this.itemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
    }
    findAll() {
        return this.modulesRepository.find();
    }
    async findOne(id) {
        const user = await this.modulesRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async update(id, module) {
        await this.modulesRepository.update(id, module);
        return this.findOne(id);
    }
    create(user) {
        return this.modulesRepository.save(user);
    }
    async remove(id) {
        await this.modulesRepository.delete(id);
    }
    async findAllApps() {
        return await this.appRepository.find({ relations: ['module', 'menus'] });
    }
    async findOneApp(id) {
        return await this.appRepository.findOne({
            where: { id },
            relations: ['module', 'menus'],
        });
    }
    async createApp(app) {
        return await this.appRepository.save(app);
    }
    async updateApp(id, app) {
        return await this.appRepository.save({ ...app, id });
    }
    async deleteApp(id) {
        await this.appRepository.delete(id);
    }
    async findAllMenus() {
        return this.menuRepository.find({ relations: ['app', 'items'] });
    }
    async findOneMenu(id) {
        return this.menuRepository.findOne({ where: { id }, relations: ['app', 'items'] });
    }
    async createMenu(menu) {
        return this.menuRepository.save(menu);
    }
    async updateMenu(id, updatedMenu) {
        const existing = await this.menuRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        const merged = this.menuRepository.merge(existing, updatedMenu);
        return this.menuRepository.save(merged);
    }
    async deleteMenu(id) {
        const result = await this.menuRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
    }
};
exports.SurveyModuleService = SurveyModuleService;
exports.SurveyModuleService = SurveyModuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(modules_entity_1.Modules)),
    __param(1, (0, typeorm_2.InjectRepository)(app_entity_1.App)),
    __param(2, (0, typeorm_2.InjectRepository)(menu_entity_1.Menu)),
    __param(3, (0, typeorm_2.InjectRepository)(item_entity_1.Item)),
    __param(4, (0, typeorm_2.InjectRepository)(subitem_entity_1.SubItem)),
    __param(5, (0, typeorm_2.InjectRepository)(field_entity_1.Field)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SurveyModuleService);
//# sourceMappingURL=survey-module.service.js.map