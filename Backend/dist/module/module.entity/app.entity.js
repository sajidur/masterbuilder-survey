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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const typeorm_1 = require("typeorm");
const modules_entity_1 = require("./modules.entity");
const menu_entity_1 = require("./menu.entity");
const swagger_1 = require("@nestjs/swagger");
let App = class App {
    id;
    name;
    moduleId;
    module;
    menus;
};
exports.App = App;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], App.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Name of the app' }),
    __metadata("design:type", String)
], App.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Module ID' }),
    __metadata("design:type", String)
], App.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => modules_entity_1.Modules, (module) => module.apps),
    __metadata("design:type", modules_entity_1.Modules)
], App.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.Menu, (menu) => menu.app),
    __metadata("design:type", Array)
], App.prototype, "menus", void 0);
exports.App = App = __decorate([
    (0, typeorm_1.Entity)()
], App);
//# sourceMappingURL=app.entity.js.map