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
const modules_entity_1 = require("./module.entity/modules.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const app_entity_1 = require("./module.entity/app.entity");
const menu_entity_1 = require("./module.entity/menu.entity");
const item_entity_1 = require("./module.entity/item.entity");
const subitem_entity_1 = require("./module.entity/subitem.entity");
const field_entity_1 = require("./module.entity/field.entity");
const subsubitem_entity_1 = require("./module.entity/subsubitem.entity");
const subSubSubItem_entity_1 = require("./module.entity/subSubSubItem.entity");
const template_1 = require("../Template/entity/template");
let SurveyModuleService = class SurveyModuleService {
    modulesRepository;
    appRepository;
    menuRepository;
    itemRepository;
    subItemRepository;
    fieldRepository;
    subSubItemRepository;
    subSubSubItemRepo;
    TemplateRepo;
    constructor(modulesRepository, appRepository, menuRepository, itemRepository, subItemRepository, fieldRepository, subSubItemRepository, subSubSubItemRepo, TemplateRepo) {
        this.modulesRepository = modulesRepository;
        this.appRepository = appRepository;
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
        this.subItemRepository = subItemRepository;
        this.fieldRepository = fieldRepository;
        this.subSubItemRepository = subSubItemRepository;
        this.subSubSubItemRepo = subSubSubItemRepo;
        this.TemplateRepo = TemplateRepo;
    }
    async toSubSubItemDto(subSubItem) {
        let subItemDto = null;
        const subItem = await this.subItemRepository.findOne({
            where: { id: subSubItem.subItemId },
        });
        if (!subItem) {
            throw new common_1.NotFoundException(`SubItem with ID ${subSubItem.subItemId} not found`);
        }
        const template = await this.TemplateRepo.findOne({ where: { id: subSubItem.templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return {
            id: subSubItem.id,
            name: subSubItem.name,
            subItemId: subSubItem?.subItemId,
            subItem: await this.toSubItemDto(subItem),
            template: template || null
        };
    }
    async toSubSubItemDto1(subSubItem, subItemDtoMap) {
        if (!subSubItem.subItemId) {
            throw new common_1.BadRequestException('SubSubItem must have a valid subItemId');
        }
        const subItemDto = subItemDtoMap.get(subSubItem.subItemId);
        if (!subItemDto) {
            throw new common_1.NotFoundException(`SubItem with ID ${subSubItem.subItemId} not found in cache`);
        }
        const template = await this.TemplateRepo.findOne({ where: { id: subSubItem.templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return {
            id: subSubItem.id,
            name: subSubItem.name,
            subItemId: subSubItem.subItemId,
            subItem: subItemDto,
            template: template || null
        };
    }
    async findAllSubSubItem() {
        const [subSubItems, subItems, items, menus, apps, modules] = await Promise.all([
            this.subSubItemRepository.find(),
            this.subItemRepository.find(),
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!subSubItems.length) {
            console.log('No sub-sub-items found.');
            return [];
        }
        const appMap = new Map(apps.map((app) => [app.id, app]));
        const moduleMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appMap.get(menu.appId);
            const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        const itemDtoMap = new Map();
        for (const item of items) {
            const menuDto = menuDtoMap.get(item.menuId);
            if (!menuDto)
                continue;
            itemDtoMap.set(item.id, {
                id: item.id,
                name: item.name,
                menu: menuDto,
            });
        }
        const subItemDtoMap = new Map();
        for (const subItem of subItems) {
            if (!subItem.itemId) {
                console.warn(`SubItem ${subItem.id} has no itemId.`);
                continue;
            }
            const itemDto = itemDtoMap.get(subItem.itemId);
            if (!itemDto) {
                console.warn(`Item with ID ${subItem.itemId} not found for SubItem ${subItem.id}`);
                continue;
            }
            subItemDtoMap.set(subItem.id, {
                id: subItem.id,
                name: subItem.name,
                itemId: subItem.itemId,
                item: itemDto,
            });
        }
        return Promise.all(subSubItems.map((subSubItem) => this.toSubSubItemDto1(subSubItem, subItemDtoMap)));
    }
    async findOneSubSubItem(id) {
        const item = await this.subSubItemRepository.findOne({
            where: { id },
        });
        if (!item) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
        return this.toSubSubItemDto(item);
    }
    async createSubSubItem(data, user) {
        var subSubItem = new subsubitem_entity_1.SubSubItem();
        subSubItem.name = data.name;
        subSubItem.subItemId = data.subItemId;
        subSubItem.createdAt = new Date();
        subSubItem.updatedAt = new Date();
        subSubItem.createdBy = user.username;
        subSubItem.updatedBy = user.username;
        subSubItem.userId = user.id;
        const saved = await this.subSubItemRepository.save(subSubItem);
        return this.toSubSubItemDto(saved);
    }
    async updateSubSubItem(id, data, user) {
        const existing = await this.subSubItemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
        existing.name = data.name;
        existing.subItemId = data.subItemId;
        existing.updatedAt = new Date();
        existing.updatedBy = user.username;
        var updatedData = await this.subSubItemRepository.save(existing);
        return this.toSubSubItemDto(updatedData);
    }
    async deleteSubSubItem(id) {
        const result = await this.subSubItemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${id} not found`);
        }
    }
    async toFieldDto1(field, subSubSubItemMap) {
        const subSubSubItem = subSubSubItemMap.get(field.subSubSubItemId);
        if (!subSubSubItem) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${field.subSubSubItemId} not found`);
        }
        return {
            id: field.id,
            name: field.name,
            fieldGroup: field.fieldGroup,
            subSubSubItemId: field.subSubSubItemId,
            subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
        };
    }
    async findAllFields() {
        const fields = await this.fieldRepository.find();
        if (!fields.length)
            return [];
        const subSuSubItemIds = Array.from(new Set(fields.map((f) => f.subSubSubItemId)));
        const subSubSubItems = await this.subSubSubItemRepo.findByIds(subSuSubItemIds);
        const subSubSubItemMap = new Map(subSubSubItems.map((sub) => [sub.id, sub]));
        return Promise.all(fields.map((field) => this.toFieldDto1(field, subSubSubItemMap)));
    }
    async findOneField(id) {
        const field = await this.fieldRepository.findOne({ where: { id } });
        if (!field)
            return null;
        const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
            id: field.subSubSubItemId,
        });
        if (!subSubSubItem) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${field.subSubSubItemId} not found`);
        }
        return {
            id: field.id,
            name: field.name,
            fieldGroup: field.fieldGroup,
            subSubSubItemId: field.subSubSubItemId,
            subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
        };
    }
    async createField(field, user) {
        const newField = new field_entity_1.Field();
        newField.name = field.name;
        newField.subSubSubItemId = field.subSubSubItemId;
        newField.updatedAt = new Date();
        newField.updatedBy = user.username;
        newField.createdAt = new Date();
        newField.createdBy = user.username;
        newField.userId = user.id;
        newField.fieldGroup = field.fieldGroup;
        const saved = await this.fieldRepository.save(newField);
        const subSubItem = await this.subSubSubItemRepo.findOneBy({
            id: saved.subSubSubItemId,
        });
        if (!subSubItem) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${saved.subSubSubItemId} not found`);
        }
        return {
            id: saved.id,
            name: saved.name,
            fieldGroup: field.fieldGroup,
            subSubSubItemId: saved.subSubSubItemId,
            subSubSubItem: await this.toSubSubSubItemDto(subSubItem),
        };
    }
    async updateField(id, updated, user) {
        const existing = await this.fieldRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
        existing.name = updated.name;
        existing.subSubSubItemId = updated.subSubSubItemId;
        existing.updatedAt = new Date();
        existing.updatedBy = user.username;
        const saved = await this.fieldRepository.save(existing);
        const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
            id: saved.subSubSubItemId,
        });
        if (!subSubSubItem) {
            throw new common_1.NotFoundException(`SubSubSubItem with ID ${saved.subSubSubItemId} not found`);
        }
        return {
            id: saved.id,
            name: saved.name,
            fieldGroup: saved.fieldGroup,
            subSubSubItemId: saved.subSubSubItemId,
            subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
        };
    }
    async deleteField(id) {
        const result = await this.fieldRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        }
    }
    async toSubItemDto1(subItem, itemDtoMap) {
        if (!subItem) {
            throw new common_1.NotFoundException('SubItem not found');
        }
        const itemId = subItem.itemId;
        if (!itemId) {
            throw new common_1.BadRequestException('SubItem must have a valid itemId');
        }
        const itemDto = itemDtoMap.get(itemId);
        if (!itemDto) {
            throw new common_1.NotFoundException(`Item with ID ${itemId} not found in cache`);
        }
        const template = await this.TemplateRepo.findOne({ where: { id: subItem.templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return {
            id: subItem.id,
            name: subItem.name,
            itemId,
            item: itemDto,
            template: template || null
        };
    }
    async findAllSubItems() {
        const [subItems, items, menus, apps, modules] = await Promise.all([
            this.subItemRepository.find(),
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!subItems.length) {
            console.log('No sub-items found.');
            return [];
        }
        const appMap = new Map(apps.map((app) => [app.id, app]));
        const moduleMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appMap.get(menu.appId);
            const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        const itemDtoMap = new Map();
        for (const item of items) {
            const menuDto = menuDtoMap.get(item.menuId);
            if (!menuDto)
                continue;
            itemDtoMap.set(item.id, {
                id: item.id,
                name: item.name,
                menu: menuDto,
            });
        }
        return Promise.all(subItems.map((subItem) => this.toSubItemDto1(subItem, itemDtoMap)));
    }
    async findOneSubItem(id) {
        if (!id) {
            throw new common_1.BadRequestException('SubItem ID must be provided');
        }
        const subItem = await this.subItemRepository.findOne({ where: { id } });
        if (!subItem) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
        const [items, menus, apps, modules] = await Promise.all([
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        const appMap = new Map(apps.map((app) => [app.id, app]));
        const moduleMap = new Map(modules.map((m) => [m.id, m]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appMap.get(menu.appId);
            const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        const itemDtoMap = new Map();
        for (const item of items) {
            const menuDto = menuDtoMap.get(item.menuId);
            if (!menuDto)
                continue;
            itemDtoMap.set(item.id, {
                id: item.id,
                name: item.name,
                menu: menuDto,
            });
        }
        return this.toSubItemDto1(subItem, itemDtoMap);
    }
    async createSubItem(subItem, user) {
        var newSubItem = new subitem_entity_1.SubItem();
        newSubItem.name = subItem.name;
        newSubItem.itemId = subItem.itemId;
        newSubItem.createdAt = new Date();
        newSubItem.createdBy = user.username;
        newSubItem.updatedAt = new Date();
        newSubItem.updatedBy = user.username;
        newSubItem.userId = user.id;
        var data = this.subItemRepository.save(newSubItem);
        const [items, menus, apps, modules] = await Promise.all([
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        const appMap = new Map(apps.map((app) => [app.id, app]));
        const moduleMap = new Map(modules.map((m) => [m.id, m]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appMap.get(menu.appId);
            const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        const itemDtoMap = new Map();
        for (const item of items) {
            const menuDto = menuDtoMap.get(item.menuId);
            if (!menuDto)
                continue;
            itemDtoMap.set(item.id, {
                id: item.id,
                name: item.name,
                menu: menuDto,
            });
        }
        return this.toSubItemDto1(await data, itemDtoMap);
    }
    async updateSubItem(id, updated, user) {
        const existing = await this.subItemRepository.findOneBy({ id });
        if (!existing) {
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        }
        existing.name = updated.name;
        existing.itemId = updated.itemId;
        existing.updatedAt = new Date();
        existing.updatedBy = user.username;
        const data = this.subItemRepository.save(existing);
        const [items, menus, apps, modules] = await Promise.all([
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        const appMap = new Map(apps.map((app) => [app.id, app]));
        const moduleMap = new Map(modules.map((m) => [m.id, m]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appMap.get(menu.appId);
            const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        const itemDtoMap = new Map();
        for (const item of items) {
            const menuDto = menuDtoMap.get(item.menuId);
            if (!menuDto)
                continue;
            itemDtoMap.set(item.id, {
                id: item.id,
                name: item.name,
                menu: menuDto,
            });
        }
        return this.toSubItemDto1(await data, itemDtoMap);
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
        const template = await this.TemplateRepo.findOne({ where: { id: subItem.templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return {
            id: subItem.id,
            name: subItem.name,
            itemId: itemId,
            item: itemDto,
            template: template || null
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
            where: { id: item.menuId },
        });
        console.log('menu title ' + menu?.title);
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${item.menuId} not found`);
        }
        return {
            id: item.id,
            name: item.name,
            menu: await this.toMenuDto(menu),
        };
    }
    async toItemDto1(item, menuDtoMap) {
        const menuDto = menuDtoMap.get(item.menuId);
        if (!menuDto) {
            throw new common_1.NotFoundException(`Menu with ID ${item.menuId} not found`);
        }
        return {
            id: item.id,
            name: item.name,
            menu: menuDto,
        };
    }
    async findAllItems() {
        const [items, menus, apps, modules] = await Promise.all([
            this.itemRepository.find(),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!items.length) {
            console.log('No items found.');
            return [];
        }
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appsMap.get(menu.appId);
            const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        return Promise.all(items.map((item) => this.toItemDto1(item, menuDtoMap)));
    }
    async findOneItem(id) {
        const [item, menus, apps, modules] = await Promise.all([
            this.itemRepository.findOne({ where: { id } }),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!item) {
            console.log('No items found.');
            return null;
        }
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appsMap.get(menu.appId);
            const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        return this.toItemDto1(item, menuDtoMap);
    }
    async createItem(item, user) {
        var newItem = new item_entity_1.Item();
        newItem.name = item.name;
        newItem.menuId = item.menuId;
        newItem.createdAt = new Date();
        newItem.createdBy = user.username;
        newItem.updatedAt = new Date();
        newItem.updatedBy = user.username;
        newItem.userId = user.id;
        const created = await this.itemRepository.save(newItem);
        const [menus, apps, modules] = await Promise.all([
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appsMap.get(menu.appId);
            const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        return this.toItemDto1(created, menuDtoMap);
    }
    async updateItem(id, updatedItem, user) {
        const [item, menus, apps, modules] = await Promise.all([
            this.itemRepository.findOne({ where: { id } }),
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!item) {
            console.log('No items found.');
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        item.menuId = updatedItem.menuId;
        item.name = updatedItem.name;
        item.updatedAt = new Date();
        item.updatedBy = user.username;
        const saved = await this.itemRepository.save(item);
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));
        const menuDtoMap = new Map();
        for (const menu of menus) {
            const app = appsMap.get(menu.appId);
            const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
            const moduleDto = module
                ? { id: module.id, name: module.name }
                : null;
            const appDto = app
                ? { id: app.id, name: app.name, Module: moduleDto }
                : null;
            menuDtoMap.set(menu.id, {
                id: menu.id,
                title: menu.title,
                app: appDto,
            });
        }
        return this.toItemDto1(saved, menuDtoMap);
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
    async update(id, dto, user) {
        const existingModule = await this.modulesRepository.findOneBy({ id });
        if (!existingModule) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
        const now = new Date();
        const userId = user.id;
        const updatedModule = this.modulesRepository.merge(existingModule, {
            ...dto,
            updatedAt: now,
            updatedBy: user.username,
            tier: dto.tier,
            name: dto.name,
        });
        return this.modulesRepository.save(updatedModule);
    }
    async create(dto, user) {
        const userId = user.id;
        const module = this.modulesRepository.create({
            name: dto.name,
            tier: dto.tier,
            userId: userId,
            createdAt: new Date(),
            createdBy: user.username,
            updatedAt: new Date(),
            updatedBy: user.username,
        });
        return this.modulesRepository.save(module);
    }
    async remove(id) {
        await this.modulesRepository.delete(id);
    }
    async toDto(app, modulesMap) {
        const module = modulesMap.get(app.moduleId);
        if (!module) {
            return null;
        }
        return {
            id: app.id,
            name: app.name,
            Module: module,
        };
    }
    async findAllApps() {
        const [apps, modules] = await Promise.all([
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!apps.length || !modules.length)
            return [];
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        const appDtos = await Promise.all(apps.map((app) => this.toDto(app, modulesMap)));
        return appDtos.filter((dto) => dto !== null);
    }
    async findOneApp(id) {
        const [app, modules] = await Promise.all([
            this.appRepository.findOne({ where: { id } }),
            this.modulesRepository.find(),
        ]);
        if (!app)
            throw new common_1.NotFoundException(`App with ID ${id} not found`);
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        return this.toDto(app, modulesMap);
    }
    async createApp(createAppDto, user) {
        const [modules] = await Promise.all([this.modulesRepository.find()]);
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        const module = modulesMap.get(createAppDto.moduleId);
        console.log(module);
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${createAppDto.moduleId} not found`);
        }
        const app = this.appRepository.create({
            name: createAppDto.name,
            moduleId: createAppDto.moduleId,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: user.id,
            createdBy: user.username,
            updatedBy: user.username,
        });
        const created = await this.appRepository.save(app);
        return this.toDto(created, modulesMap);
    }
    async updateApp(id, app, user) {
        const [modules] = await Promise.all([this.modulesRepository.find()]);
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        const module = modulesMap.get(app.moduleId);
        console.log(module);
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${app.moduleId} not found`);
        }
        const existing = await this.appRepository.preload({
            id,
            updatedAt: new Date(),
            updatedBy: user.username,
            ...app,
        });
        if (!existing) {
            throw new common_1.NotFoundException(`App with ID ${id} not found`);
        }
        const updated = await this.appRepository.save(existing);
        return this.toDto(updated, modulesMap);
    }
    async deleteApp(id) {
        await this.appRepository.delete(id);
    }
    async toMenuDto(menu) {
        const app = menu.appId
            ? await this.appRepository.findOne({ where: { id: menu.appId } })
            : null;
        console.log('menu appId ' + menu.appId);
        console.log('app name ' + app?.moduleId);
        const module = app?.moduleId
            ? await this.modulesRepository.findOne({ where: { id: app.moduleId } })
            : null;
        console.log('Module name ' + module?.name);
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
    async toMenuDto1(menu, appsMap, modulesMap) {
        const app = menu.appId ? (appsMap.get(menu.appId) ?? null) : null;
        const module = app?.moduleId
            ? (modulesMap.get(app.moduleId) ?? null)
            : null;
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
        const [menus, apps, modules] = await Promise.all([
            this.menuRepository.find(),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (menus.length === 0) {
            console.log('No menus found.');
            return [];
        }
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        return Promise.all(menus.map((menu) => this.toMenuDto1(menu, appsMap, modulesMap)));
    }
    async findOneMenu(id) {
        const [menu, apps, modules] = await Promise.all([
            this.menuRepository.findOne({
                where: { id },
            }),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!menu) {
            console.log('No menu found.');
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        return this.toMenuDto1(menu, appsMap, modulesMap);
    }
    async createMenu(menuDto, user) {
        var menu = new menu_entity_1.Menu();
        menu.appId = menuDto.appId;
        menu.title = menuDto.title;
        menu.createdAt = new Date();
        menu.updatedAt = new Date();
        menu.userId = user.id;
        menu.createdBy = user.username;
        menu.updatedBy = user.username;
        const saved = await this.menuRepository.save(menu);
        console.log('menu appId ' + saved.appId);
        const [apps, modules] = await Promise.all([
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        return this.toMenuDto1(menu, appsMap, modulesMap);
    }
    async updateMenu(id, updateDto, user) {
        const [menu, apps, modules] = await Promise.all([
            this.menuRepository.findOne({
                where: { id },
            }),
            this.appRepository.find(),
            this.modulesRepository.find(),
        ]);
        if (!menu) {
            console.log('No menu found.');
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        const appsMap = new Map(apps.map((app) => [app.id, app]));
        const modulesMap = new Map(modules.map((m) => [m.id, m]));
        menu.updatedAt = new Date();
        menu.updatedBy = user.username;
        const merged = this.menuRepository.merge(menu, updateDto);
        const saved = await this.menuRepository.save(merged);
        return this.toMenuDto1(saved, appsMap, modulesMap);
    }
    async deleteMenu(id) {
        const result = await this.menuRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
    }
    async toSubSubSubItemDto(entity) {
        let subSubItemDto = null;
        if (entity.subSubItemId) {
            const subSubItem = await this.subSubItemRepository.findOne({
                where: { id: entity.subSubItemId },
            });
            if (!subSubItem) {
                throw new common_1.NotFoundException(`SubSubItem with ID ${entity.subSubItemId} not found`);
            }
            subSubItemDto = await this.toSubSubItemDto(subSubItem);
        }
        const template = await this.TemplateRepo.findOne({ where: { id: entity.templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return {
            id: entity.id,
            name: entity.name,
            tier: entity.tier,
            templateId: entity.templateId,
            subSubItemId: entity.subSubItemId,
            subSubItem: subSubItemDto,
            userId: entity.userId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            template: template || null
        };
    }
    async findAllSubSubSubItems() {
        const items = await this.subSubSubItemRepo.find();
        return Promise.all(items.map((i) => this.toSubSubSubItemDto(i)));
    }
    async findOneSubSubSubItem(id) {
        const item = await this.subSubSubItemRepo.findOne({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException(`SubSubSubItem with ID ${id} not found`);
        }
        return this.toSubSubSubItemDto(item);
    }
    async createSubSubSubItem(dto, user) {
        const entity = this.subSubSubItemRepo.create({
            ...dto,
            createdBy: user.username,
            updatedBy: user.username,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: user.id,
        });
        const saved = await this.subSubSubItemRepo.save(entity);
        return this.toSubSubSubItemDto(saved);
    }
    async updateSubSubSubItem(id, dto, user) {
        const existing = await this.subSubItemRepository.findOne({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`SubSubSubItem with ID ${id} not found`);
        }
        Object.assign(existing, {
            ...dto,
            updatedBy: user.username,
            updatedAt: new Date(),
        });
        const updated = await this.subSubSubItemRepo.save(existing);
        return this.toSubSubSubItemDto(updated);
    }
    async deleteSubSubSubItem(id) {
        const result = await this.subSubSubItemRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubSubSubItem with ID ${id} not found`);
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
    __param(7, (0, typeorm_2.InjectRepository)(subSubSubItem_entity_1.SubSubSubItem)),
    __param(8, (0, typeorm_2.InjectRepository)(template_1.Template)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SurveyModuleService);
//# sourceMappingURL=survey-module.service.js.map