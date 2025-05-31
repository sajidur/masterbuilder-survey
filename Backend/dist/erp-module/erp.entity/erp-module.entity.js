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
exports.ErpModule = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let ErpModule = class ErpModule {
    id;
    module;
    app;
    menu;
    item;
    subItem;
    subSubItem;
    field;
    remarks;
    created_at;
    updated_at;
};
exports.ErpModule = ErpModule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ErpModule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Name of the module' }),
    __metadata("design:type", String)
], ErpModule.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Associated application name' }),
    __metadata("design:type", String)
], ErpModule.prototype, "app", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Name of the menu under which this module appears' }),
    __metadata("design:type", String)
], ErpModule.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Item name associated with the module' }),
    __metadata("design:type", String)
], ErpModule.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Sub-Item name associated with the module' }),
    __metadata("design:type", String)
], ErpModule.prototype, "subItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'SubSub-Item name associated with the module' }),
    __metadata("design:type", String)
], ErpModule.prototype, "subSubItem", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, swagger_1.ApiProperty)({ description: 'Field details in text format' }),
    __metadata("design:type", String)
], ErpModule.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Additional remarks or notes about the module', required: false }),
    __metadata("design:type", String)
], ErpModule.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the module was created' }),
    __metadata("design:type", Date)
], ErpModule.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the module was last updated' }),
    __metadata("design:type", Date)
], ErpModule.prototype, "updated_at", void 0);
exports.ErpModule = ErpModule = __decorate([
    (0, typeorm_1.Entity)()
], ErpModule);
//# sourceMappingURL=erp-module.entity.js.map