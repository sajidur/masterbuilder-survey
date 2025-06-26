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
exports.SurveyModuleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const survey_module_service_1 = require("./survey-module.service");
const modules_entity_1 = require("./module.entity/modules.entity");
const app_entity_1 = require("./module.entity/app.entity");
const subsubitem_entity_1 = require("./module.entity/subsubitem.entity");
const App_dto_1 = require("./module.dto/App.dto");
const menu_dto_1 = require("./module.dto/menu.dto");
const item_dto_1 = require("./module.dto/item.dto");
const subiItem_dto_1 = require("./module.dto/subiItem.dto");
const subSubItem_dto_1 = require("./module.dto/subSubItem.dto");
const field_dto_1 = require("./module.dto/field.dto");
const create_module_dto_1 = require("./module.dto/create-module.dto");
const subsubsubitem_dto_1 = require("./module.dto/subsubsubitem.dto");
let SurveyModuleController = class SurveyModuleController {
    moduleService;
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    async findAllSubItems() {
        return await this.moduleService.findAllSubItems();
    }
    async findOneSubItem(id) {
        return await this.moduleService.findOneSubItem(id);
    }
    async createSubItem(subItem, req) {
        const user = req['user'];
        return await this.moduleService.createSubItem(subItem, user);
    }
    async updateSubItem(id, subItem, req) {
        const user = req['user'];
        return await this.moduleService.updateSubItem(id, subItem, user);
    }
    deleteSubItem(id) {
        return this.moduleService.deleteSubItem(id);
    }
    findAll() {
        return this.moduleService.findAll();
    }
    findOne(id) {
        return this.moduleService.findOne(id);
    }
    create(moduleDto, req) {
        const user = req['user'];
        return this.moduleService.create(moduleDto, user);
    }
    update(id, moduleDto, req) {
        const user = req['user'];
        return this.moduleService.update(id, moduleDto, user);
    }
    remove(id) {
        return this.moduleService.remove(id);
    }
    findAllApps() {
        return this.moduleService.findAllApps();
    }
    async findOneApp(id) {
        const app = await this.moduleService.findOneApp(id);
        if (!app) {
            throw new common_1.NotFoundException(`App with ID ${id} not found`);
        }
        return app;
    }
    createApp(app, req) {
        const user = req['user'];
        return this.moduleService.createApp(app, user);
    }
    updateApp(id, app, req) {
        const user = req['user'];
        return this.moduleService.updateApp(id, app, user);
    }
    deleteApp(id) {
        return this.moduleService.deleteApp(id);
    }
    findAllMenus() {
        return this.moduleService.findAllMenus();
    }
    async findOneMenu(id) {
        const menu = await this.moduleService.findOneMenu(id);
        if (!menu)
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        return menu;
    }
    createMenu(menuDto, req) {
        const user = req['user'];
        return this.moduleService.createMenu(menuDto, user);
    }
    updateMenu(id, menuDto, req) {
        const user = req['user'];
        return this.moduleService.updateMenu(id, menuDto, user);
    }
    deleteMenu(id) {
        return this.moduleService.deleteMenu(id);
    }
    findAllItems() {
        return this.moduleService.findAllItems();
    }
    async findOneItem(id) {
        const item = await this.moduleService.findOneItem(id);
        if (!item)
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        return item;
    }
    createItem(item, req) {
        const user = req['user'];
        return this.moduleService.createItem(item, user);
    }
    updateItem(id, item, req) {
        const user = req['user'];
        return this.moduleService.updateItem(id, item, user);
    }
    deleteItem(id) {
        return this.moduleService.deleteItem(id);
    }
    async findAllFields() {
        return this.moduleService.findAllFields();
    }
    async findOneField(id) {
        const field = await this.moduleService.findOneField(id);
        if (!field)
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        return field;
    }
    async createField(field, req) {
        const user = req['user'];
        return this.moduleService.createField(field, user);
    }
    async updateField(id, field, req) {
        const user = req['user'];
        return this.moduleService.updateField(id, field, user);
    }
    deleteField(id) {
        return this.moduleService.deleteField(id);
    }
    async findAllSubSubItems() {
        return this.moduleService.findAllSubSubItem();
    }
    async findOneSubSubItem(id) {
        return this.moduleService.findOneSubSubItem(id);
    }
    async createSubSubItem(data, req) {
        const user = req['user'];
        return this.moduleService.createSubSubItem(data, user);
    }
    async updateSubSubItem(id, data, req) {
        const user = req['user'];
        return this.moduleService.updateSubSubItem(id, data, user);
    }
    async deleteSubSubItem(id) {
        return this.moduleService.deleteSubSubItem(id);
    }
    async findAllSubSubSubItems() {
        return this.moduleService.findAllSubSubSubItems();
    }
    async findOneSubSubSubItem(id) {
        return this.moduleService.findOneSubSubSubItem(id);
    }
    async createSubSubSubItem(dto, req) {
        const user = req['user'];
        return this.moduleService.createSubSubSubItem(dto, user);
    }
    async updateSubSubSubItem(id, dto, req) {
        const user = req['user'];
        return this.moduleService.updateSubSubSubItem(id, dto, user);
    }
    async deleteSubSubSubItem(id) {
        return this.moduleService.deleteSubSubSubItem(id);
    }
};
exports.SurveyModuleController = SurveyModuleController;
__decorate([
    (0, common_1.Get)('allSubitems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [subiItem_dto_1.SubItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllSubItems", null);
__decorate([
    (0, common_1.Get)('getSubitem/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: subiItem_dto_1.SubItemDto }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'SubItem ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneSubItem", null);
__decorate([
    (0, common_1.Post)('addSubitems'),
    (0, swagger_1.ApiBody)({ type: subiItem_dto_1.CreateSubItemDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: subiItem_dto_1.SubItemDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subiItem_dto_1.CreateSubItemDto, Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createSubItem", null);
__decorate([
    (0, common_1.Put)('updateSubitems/:id'),
    (0, swagger_1.ApiBody)({ type: subiItem_dto_1.CreateSubItemDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subiItem_dto_1.SubItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subiItem_dto_1.CreateSubItemDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateSubItem", null);
__decorate([
    (0, common_1.Delete)('deleteSubitems/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'SubItem deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteSubItem", null);
__decorate([
    (0, common_1.Get)('allModules'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getModule:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('addModule'),
    (0, swagger_1.ApiBody)({ type: create_module_dto_1.CreateModuleDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Module created', type: modules_entity_1.Modules }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('updateModule/:id'),
    (0, swagger_1.ApiBody)({ type: create_module_dto_1.UpdateModuleDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module updated', type: modules_entity_1.Modules }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_module_dto_1.UpdateModuleDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteModule:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('allApps'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [App_dto_1.AppDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllApps", null);
__decorate([
    (0, common_1.Get)('getApps/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: App_dto_1.AppDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneApp", null);
__decorate([
    (0, common_1.Post)('addApps'),
    (0, swagger_1.ApiBody)({ type: App_dto_1.CreateAppDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: App_dto_1.AppDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [App_dto_1.CreateAppDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createApp", null);
__decorate([
    (0, common_1.Put)('updateApps/:id'),
    (0, swagger_1.ApiBody)({ type: app_entity_1.App }),
    (0, swagger_1.ApiResponse)({ status: 200, type: App_dto_1.AppDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, App_dto_1.UpdateAppDto, Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateApp", null);
__decorate([
    (0, common_1.Delete)('deleteApps/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'App deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteApp", null);
__decorate([
    (0, common_1.Get)('allMenus'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [menu_dto_1.MenuDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllMenus", null);
__decorate([
    (0, common_1.Get)('getMenu/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: menu_dto_1.MenuDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneMenu", null);
__decorate([
    (0, common_1.Post)('addMenu'),
    (0, swagger_1.ApiBody)({ type: menu_dto_1.CreateMenuDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: menu_dto_1.MenuDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.CreateMenuDto, Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Put)('updateMenu/:id'),
    (0, swagger_1.ApiBody)({ type: menu_dto_1.CreateMenuDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: menu_dto_1.MenuDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_dto_1.CreateMenuDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Delete)('deleteMenu/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Menu deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteMenu", null);
__decorate([
    (0, common_1.Get)('allItems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [item_dto_1.ItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.Get)('getItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_dto_1.ItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneItem", null);
__decorate([
    (0, common_1.Post)('addItem'),
    (0, swagger_1.ApiBody)({ type: item_dto_1.CreateItemDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: item_dto_1.ItemDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_dto_1.CreateItemDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createItem", null);
__decorate([
    (0, common_1.Put)('updateItem/:id'),
    (0, swagger_1.ApiBody)({ type: item_dto_1.CreateItemDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_dto_1.ItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_dto_1.CreateItemDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('deleteItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Item deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)('allFields'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [field_dto_1.FieldDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllFields", null);
__decorate([
    (0, common_1.Get)('getField/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: field_dto_1.FieldDto }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Field ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneField", null);
__decorate([
    (0, common_1.Post)('addField'),
    (0, swagger_1.ApiBody)({ type: field_dto_1.CreateFieldDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: field_dto_1.FieldDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_dto_1.CreateFieldDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createField", null);
__decorate([
    (0, common_1.Put)('updateField/:id'),
    (0, swagger_1.ApiBody)({ type: field_dto_1.CreateFieldDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: field_dto_1.FieldDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, field_dto_1.CreateFieldDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateField", null);
__decorate([
    (0, common_1.Delete)('deleteField/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Field deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteField", null);
__decorate([
    (0, common_1.Get)('allSubSubItems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [subSubItem_dto_1.SubSubItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllSubSubItems", null);
__decorate([
    (0, common_1.Get)('getSubSubItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: subSubItem_dto_1.SubSubItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneSubSubItem", null);
__decorate([
    (0, common_1.Post)('addSubSubItem'),
    (0, swagger_1.ApiBody)({ type: subSubItem_dto_1.CreateSubSubItemDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: subSubItem_dto_1.SubSubItemDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subSubItem_dto_1.CreateSubSubItemDto, Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createSubSubItem", null);
__decorate([
    (0, common_1.Put)('updateSubSubItem/:id'),
    (0, swagger_1.ApiBody)({ type: subsubitem_entity_1.SubSubItem }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subSubItem_dto_1.SubSubItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subsubitem_entity_1.SubSubItem,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateSubSubItem", null);
__decorate([
    (0, common_1.Delete)('deleteSubSubItem:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteSubSubItem", null);
__decorate([
    (0, common_1.Get)('getAllSubSubSubItems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [subsubsubitem_dto_1.SubSubSubItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllSubSubSubItems", null);
__decorate([
    (0, common_1.Get)('SubSubSubItem:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: subsubsubitem_dto_1.SubSubSubItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneSubSubSubItem", null);
__decorate([
    (0, common_1.Post)('addSubSubSubItem'),
    (0, swagger_1.ApiBody)({ type: subsubsubitem_dto_1.CreateSubSubSubItemDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: subsubsubitem_dto_1.SubSubSubItemDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subsubsubitem_dto_1.CreateSubSubSubItemDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createSubSubSubItem", null);
__decorate([
    (0, common_1.Put)('updateSubSubSubItem/:id'),
    (0, swagger_1.ApiBody)({ type: subsubsubitem_dto_1.CreateSubSubSubItemDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subsubsubitem_dto_1.SubSubSubItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subsubsubitem_dto_1.CreateSubSubSubItemDto,
        Request]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateSubSubSubItem", null);
__decorate([
    (0, common_1.Delete)('deleteSubSubSubItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteSubSubSubItem", null);
exports.SurveyModuleController = SurveyModuleController = __decorate([
    (0, swagger_1.ApiTags)('survey-module'),
    (0, common_1.Controller)('survey-module'),
    __metadata("design:paramtypes", [survey_module_service_1.SurveyModuleService])
], SurveyModuleController);
//# sourceMappingURL=survey-module.controller.js.map