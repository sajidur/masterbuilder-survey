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
const modules_entity_1 = require("./survey-module.entity/modules.entity");
const app_entity_1 = require("./survey-module.entity/app.entity");
const menu_entity_1 = require("./survey-module.entity/menu.entity");
const item_entity_1 = require("./survey-module.entity/item.entity");
const subitem_entity_1 = require("./survey-module.entity/subitem.entity");
const field_entity_1 = require("./survey-module.entity/field.entity");
const subsubitem_entity_1 = require("./survey-module.entity/subsubitem.entity");
const App_dto_1 = require("./survey-module.dto/App.dto");
let SurveyModuleController = class SurveyModuleController {
    moduleService;
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    findAllSubItems() {
        return this.moduleService.findAllSubItems();
    }
    async findOneSubItem(id) {
        const subItem = await this.moduleService.findOneSubItem(id);
        if (!subItem)
            throw new common_1.NotFoundException(`SubItem with ID ${id} not found`);
        return subItem;
    }
    createSubItem(subItem) {
        return this.moduleService.createSubItem(subItem);
    }
    updateSubItem(id, subItem) {
        return this.moduleService.updateSubItem(id, subItem);
    }
    deleteSubItem(id) {
        return this.moduleService.deleteSubItem(id);
    }
    findAll() {
        return this.moduleService.findAll();
    }
    findOne(id) {
        return this.moduleService.findOne(+id);
    }
    create(module) {
        return this.moduleService.create(module);
    }
    update(id, module) {
        return this.moduleService.update(id, module);
    }
    remove(id) {
        return this.moduleService.remove(+id);
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
    createApp(app) {
        return this.moduleService.createApp(app);
    }
    updateApp(id, app) {
        return this.moduleService.updateApp(id, app);
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
    createMenu(menu) {
        return this.moduleService.createMenu(menu);
    }
    updateMenu(id, menu) {
        return this.moduleService.updateMenu(id, menu);
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
    createItem(item) {
        return this.moduleService.createItem(item);
    }
    updateItem(id, item) {
        return this.moduleService.updateItem(id, item);
    }
    deleteItem(id) {
        return this.moduleService.deleteItem(id);
    }
    findAllFields() {
        return this.moduleService.findAllFields();
    }
    async findOneField(id) {
        const field = await this.moduleService.findOneField(id);
        if (!field)
            throw new common_1.NotFoundException(`Field with ID ${id} not found`);
        return field;
    }
    createField(field) {
        return this.moduleService.createField(field);
    }
    updateField(id, field) {
        return this.moduleService.updateField(id, field);
    }
    deleteField(id) {
        return this.moduleService.deleteField(id);
    }
    findAllSubSubItem() {
        return this.moduleService.findAllSubSubItem();
    }
    findOneSubSubItem(id) {
        return this.moduleService.findOneSubSubItem(id);
    }
    createSubSubItem(data) {
        return this.moduleService.createSubSubItem(data);
    }
    updateSubSubItem(id, data) {
        return this.moduleService.updateSubSubItem(id, data);
    }
    async deleteSubSubItem(id) {
        return this.moduleService.deleteSubSubItem(id);
    }
};
exports.SurveyModuleController = SurveyModuleController;
__decorate([
    (0, common_1.Get)('allSubitems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [subitem_entity_1.SubItem] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllSubItems", null);
__decorate([
    (0, common_1.Get)('getSubitem/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: subitem_entity_1.SubItem }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'SubItem ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneSubItem", null);
__decorate([
    (0, common_1.Post)('addSubitems'),
    (0, swagger_1.ApiBody)({ type: subitem_entity_1.SubItem }),
    (0, swagger_1.ApiResponse)({ status: 201, type: subitem_entity_1.SubItem }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subitem_entity_1.SubItem]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createSubItem", null);
__decorate([
    (0, common_1.Put)('updateSubitems/:id'),
    (0, swagger_1.ApiBody)({ type: subitem_entity_1.SubItem }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subitem_entity_1.SubItem }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subitem_entity_1.SubItem]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateSubItem", null);
__decorate([
    (0, common_1.Delete)('deleteSubitems/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'SubItem deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
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
    (0, swagger_1.ApiBody)({ type: modules_entity_1.Modules }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Module created', type: modules_entity_1.Modules }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modules_entity_1.Modules]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('updateModule:id'),
    (0, swagger_1.ApiBody)({ type: modules_entity_1.Modules }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module updated', type: modules_entity_1.Modules }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, modules_entity_1.Modules]),
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
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneApp", null);
__decorate([
    (0, common_1.Post)('addApps'),
    (0, swagger_1.ApiBody)({ type: app_entity_1.App }),
    (0, swagger_1.ApiResponse)({ status: 201, type: App_dto_1.AppDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_entity_1.App]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createApp", null);
__decorate([
    (0, common_1.Put)('updateApps/:id'),
    (0, swagger_1.ApiBody)({ type: app_entity_1.App }),
    (0, swagger_1.ApiResponse)({ status: 200, type: App_dto_1.AppDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, app_entity_1.App]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateApp", null);
__decorate([
    (0, common_1.Delete)('deleteApps/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'App deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteApp", null);
__decorate([
    (0, common_1.Get)('allMenus'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [menu_entity_1.Menu] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllMenus", null);
__decorate([
    (0, common_1.Get)('getMenu/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: menu_entity_1.Menu }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneMenu", null);
__decorate([
    (0, common_1.Post)('addMenu'),
    (0, swagger_1.ApiBody)({ type: menu_entity_1.Menu }),
    (0, swagger_1.ApiResponse)({ status: 201, type: menu_entity_1.Menu }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_entity_1.Menu]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Put)('updateMenu/:id'),
    (0, swagger_1.ApiBody)({ type: menu_entity_1.Menu }),
    (0, swagger_1.ApiResponse)({ status: 200, type: menu_entity_1.Menu }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, menu_entity_1.Menu]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Delete)('deleteMenu/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Menu deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteMenu", null);
__decorate([
    (0, common_1.Get)('allItems'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [item_entity_1.Item] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.Get)('getItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_entity_1.Item }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneItem", null);
__decorate([
    (0, common_1.Post)('addiItem'),
    (0, swagger_1.ApiBody)({ type: item_entity_1.Item }),
    (0, swagger_1.ApiResponse)({ status: 201, type: item_entity_1.Item }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_entity_1.Item]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createItem", null);
__decorate([
    (0, common_1.Put)('updateItem/:id'),
    (0, swagger_1.ApiBody)({ type: item_entity_1.Item }),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_entity_1.Item }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, item_entity_1.Item]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('deleteItem/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Item deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)('allFields'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [field_entity_1.Field] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllFields", null);
__decorate([
    (0, common_1.Get)('getfField/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: field_entity_1.Field }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Field ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneField", null);
__decorate([
    (0, common_1.Post)('addField'),
    (0, swagger_1.ApiBody)({ type: field_entity_1.Field }),
    (0, swagger_1.ApiResponse)({ status: 201, type: field_entity_1.Field }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_entity_1.Field]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createField", null);
__decorate([
    (0, common_1.Put)('updateField/:id'),
    (0, swagger_1.ApiBody)({ type: field_entity_1.Field }),
    (0, swagger_1.ApiResponse)({ status: 200, type: field_entity_1.Field }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, field_entity_1.Field]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateField", null);
__decorate([
    (0, common_1.Delete)('deleteField/:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Field deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteField", null);
__decorate([
    (0, common_1.Get)("allSubSubItems"),
    (0, swagger_1.ApiResponse)({ status: 200, type: [subsubitem_entity_1.SubSubItem] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findAllSubSubItem", null);
__decorate([
    (0, common_1.Get)('getSubSubItem:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: subsubitem_entity_1.SubSubItem }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "findOneSubSubItem", null);
__decorate([
    (0, common_1.Post)('addSubSubItem'),
    (0, swagger_1.ApiBody)({ type: subsubitem_entity_1.SubSubItem }),
    (0, swagger_1.ApiResponse)({ status: 201, type: subsubitem_entity_1.SubSubItem }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subsubitem_entity_1.SubSubItem]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "createSubSubItem", null);
__decorate([
    (0, common_1.Put)('updateSubSubItem:id'),
    (0, swagger_1.ApiBody)({ type: subsubitem_entity_1.SubSubItem }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subsubitem_entity_1.SubSubItem }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subsubitem_entity_1.SubSubItem]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "updateSubSubItem", null);
__decorate([
    (0, common_1.Delete)('deleteSubSubItem:id'),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "deleteSubSubItem", null);
exports.SurveyModuleController = SurveyModuleController = __decorate([
    (0, swagger_1.ApiTags)('survey-module'),
    (0, common_1.Controller)('survey-module'),
    __metadata("design:paramtypes", [survey_module_service_1.SurveyModuleService])
], SurveyModuleController);
//# sourceMappingURL=survey-module.controller.js.map