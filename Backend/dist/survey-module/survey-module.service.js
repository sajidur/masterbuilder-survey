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
const subsubitem_entity_1 = require("./survey-module.entity/subsubitem.entity");
let SurveyModuleService = class SurveyModuleService {
    modulesRepository;
    appRepository;
    menuRepository;
    itemRepository;
    subItemRepository;
    fieldRepository;
    subSubItemRepository;
    constructor(modulesRepository, appRepository, menuRepository, itemRepository, subItemRepository, fieldRepository, subSubItemRepository) {
        this.modulesRepository = modulesRepository;
        this.appRepository = appRepository;
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
        this.subItemRepository = subItemRepository;
        this.fieldRepository = fieldRepository;
        this.subSubItemRepository = subSubItemRepository;
    }
    async toSubSubItemDto(subSubItem) {
        let subItemDto = null;
        if (subSubItem.subItemId) {
            const subItem = await this.subItemRepository.findOne({
                where: { id: subSubItem.subItemId }
            });
            console.log("subItem label " + subItem?.label);
            if (subItem) {
                subItemDto = await this.toSubItemDto(subItem);
            }
        }
        return {
            id: subSubItem.id,
            label: subSubItem.label,
            subItemId: subSubItem?.subItemId,
            subItem: subItemDto,
        };
    }
    async findAllSubSubItem() {
        const items = await this.subSubItemRepository.find();
        return Promise.all(items.map(item => this.toSubSubItemDto(item)));
    }
    async findOneSubSubItem(id) {
        const item = await this.subSubItemRepository.findOne({
            where: { id }
        });
        if (!item) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
        return this.toSubSubItemDto(item);
    }
    async createSubSubItem(data) {
        var subSubItem = new subsubitem_entity_1.SubSubItem();
        subSubItem.label = data.label;
        subSubItem.subItemId = data.subItemId;
        const saved = await this.subSubItemRepository.save(subSubItem);
        return this.toSubSubItemDto(saved);
    }
    async updateSubSubItem(id, data) {
        const existing = await this.subSubItemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
        existing.label = data.label;
        existing.subItemId = data.subItemId;
        var updatedData = await this.subSubItemRepository.save(existing);
        return this.toSubSubItemDto(updatedData);
    }
    async deleteSubSubItem(id) {
        const result = await this.subSubItemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
    }
    async toFieldDto(field) {
        const subSubItem = await this.subSubItemRepository.findOneBy({ id: field.subSubItemId });
        const subSubItemDto = subSubItem
            ? {
                id: subSubItem.id,
                label: subSubItem.label,
                subItemId: subSubItem.subItemId,
                subItem: subSubItem.subItem
                    ? await this.toSubItemDto(subSubItem.subItem)
                    : null,
            }
            : null;
        return {
            id: field.id,
            name: field.name,
            subSubItemId: field.subSubItemId,
            subSubItem: subSubItemDto,
        };
    }
    async findAllFields() {
        const fields = await this.fieldRepository.find();
        return Promise.all(fields.map((field) => this.toFieldDto(field)));
    }
    async findOneField(id) {
        const field = await this.fieldRepository.findOne({
            where: { id }
        });
        return field ? this.toFieldDto(field) : null;
    }
    async createField(field) {
        var newField = new field_entity_1.Field();
        newField.name = field.name;
        newField.subSubItemId = field.subSubItemId;
        const data = await this.fieldRepository.save(newField);
        return await this.toFieldDto(data);
    }
    async updateField(id, updated) {
        const existing = await this.fieldRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
        existing.name = updated.name;
        existing.subSubItemId = updated.subSubItemId;
        const saved = await this.fieldRepository.save(existing);
        return await this.toFieldDto(saved);
    }
    async deleteField(id) {
        const result = await this.fieldRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
    }
    async findAllSubItems() {
        return this.subItemRepository.find();
    }
    async findOneSubItem(id) {
        return this.subItemRepository.findOne({ where: { id } });
    }
    async createSubItem(subItem) {
        var newSubItem = new subitem_entity_1.SubItem();
        newSubItem.label = subItem.label;
        newSubItem.itemId = subItem.itemId;
        return this.subItemRepository.save(newSubItem);
    }
    async updateSubItem(id, updated) {
        const existing = await this.subItemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
        existing.label = updated.label;
        existing.itemId = updated.itemId;
        return this.subItemRepository.save(existing);
    }
    async toSubItemDto(subItem) {
        let itemDto = null;
        const itemId = subItem?.itemId;
        if (itemId === undefined || itemId == null) {
            throw new common_1.BadRequestException('SubItem must have a valid itemId');
        }
        const item = await this.itemRepository.findOne({
            where: { id: itemId },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${itemId} not found`);
        }
        itemDto = await this.toItemDto(item);
        return {
            id: subItem.id,
            label: subItem.label,
            itemId: itemId,
            item: itemDto,
        };
    }
    async deleteSubItem(id) {
        const result = await this.subItemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
    }
    async toItemDto(item) {
        const menu = await this.menuRepository.findOne({
            where: { id: item.menuId }
        });
        console.log("menu title " + menu?.title);
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${item.menuId} not found`);
        }
        return {
            id: item.id,
            name: item.name,
            menu: await this.toMenuDto(menu),
        };
    }
    async findAllItems() {
        const items = await this.itemRepository.find();
        return Promise.all(items.map(item => this.toItemDto(item)));
    }
    async findOneItem(id) {
        const item = await this.itemRepository.findOne({ where: { id } });
        return item ? await this.toItemDto(item) : null;
    }
    async createItem(item) {
        var newItem = new item_entity_1.Item();
        newItem.name = item.name;
        newItem.menuId = item.menuId;
        const created = await this.itemRepository.save(newItem);
        return this.toItemDto(created);
    }
    async updateItem(id, updatedItem) {
        const existing = await this.itemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        existing.menuId = updatedItem.menuId;
        existing.name = updatedItem.name;
        const saved = await this.itemRepository.save(existing);
        return this.toItemDto(saved);
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
    async update(id, moduleDto) {
        const existing = await this.modulesRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
        const merged = this.modulesRepository.merge(existing, moduleDto);
        return this.modulesRepository.save(merged);
    }
    create(user) {
        return this.modulesRepository.save(user);
    }
    async remove(id) {
        await this.modulesRepository.delete(id);
    }
    async toDto(app) {
        const module = await this.modulesRepository.findOne({
            where: { id: app.moduleId },
        });
        if (!module) {
            throw new Error(`Module with ID ${app.moduleId} not found`);
        }
        return {
            id: app.id,
            name: app.name,
            Module: module,
        };
    }
    async findAllApps() {
        const apps = await this.appRepository.find();
        const dtoPromises = apps.map(app => this.toDto(app));
        return await Promise.all(dtoPromises);
    }
    async findOneApp(id) {
        const app = await this.appRepository.findOne({ where: { id } });
        return app ? await this.toDto(app) : null;
    }
    async createApp(createAppDto) {
        const app = this.appRepository.create({
            name: createAppDto.name,
            moduleId: createAppDto.moduleId,
        });
        const created = await this.appRepository.save(app);
        return this.toDto(created);
    }
    async updateApp(id, app) {
        const existing = await this.appRepository.preload({ id, ...app });
        if (!existing) {
            throw new common_1.NotFoundException(`App with ID ${id} not found`);
        }
        const updated = await this.appRepository.save(existing);
        return this.toDto(updated);
    }
    async deleteApp(id) {
        await this.appRepository.delete(id);
    }
    async toMenuDto(menu) {
        const app = menu.appId
            ? await this.appRepository.findOne({ where: { id: menu.appId } })
            : null;
        console.log("menu appId " + menu.appId);
        console.log("app name " + app?.moduleId);
        const module = app?.moduleId
            ? await this.modulesRepository.findOne({ where: { id: app.moduleId } })
            : null;
        console.log("Module name " + module?.name);
        const moduleDto = module && {
            id: module.id,
            name: module.name,
        };
        const appDto = app && {
            id: app.id,
            name: app.name,
            Module: moduleDto,
        };
        return {
            id: menu.id,
            title: menu.title,
            app: appDto,
        };
    }
    async findAllMenus() {
        const menus = await this.menuRepository.find();
        if (menus.length === 0) {
            console.log("No menus found.");
            return [];
        }
        return Promise.all(menus.map(menu => this.toMenuDto(menu)));
    }
    async findOneMenu(id) {
        const menu = await this.menuRepository.findOne({
            where: { id },
        });
        return menu ? await this.toMenuDto(menu) : null;
    }
    async createMenu(menuDto) {
        var menu = new menu_entity_1.Menu();
        menu.appId = menuDto.appId;
        menu.title = menuDto.title;
        const saved = await this.menuRepository.save(menu);
        console.log("menu appId " + saved.appId);
        return await this.toMenuDto(saved);
    }
    async updateMenu(id, updateDto) {
        const existing = await this.menuRepository.findOne({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        const merged = this.menuRepository.merge(existing, updateDto);
        const saved = await this.menuRepository.save(merged);
        return await this.toMenuDto(saved);
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
    __param(6, (0, typeorm_2.InjectRepository)(subsubitem_entity_1.SubSubItem)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SurveyModuleService);
//# sourceMappingURL=survey-module.service.js.map