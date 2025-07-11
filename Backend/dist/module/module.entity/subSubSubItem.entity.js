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
exports.SubSubSubItem = void 0;
const typeorm_1 = require("typeorm");
const subsubitem_entity_1 = require("./subsubitem.entity");
let SubSubSubItem = class SubSubSubItem {
    id;
    name;
    subSubItemId;
    tier;
    layout;
    serialNumber;
    subSubItem;
    templateId;
    templateText;
    userId;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.SubSubSubItem = SubSubSubItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "subSubItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "layout", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subsubitem_entity_1.SubSubItem, (subSubItem) => subSubItem.subSubSubItems, {
        nullable: true,
    }),
    __metadata("design:type", subsubitem_entity_1.SubSubItem)
], SubSubSubItem.prototype, "subSubItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "templateText", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubSubSubItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SubSubSubItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubSubSubItem.prototype, "updatedBy", void 0);
exports.SubSubSubItem = SubSubSubItem = __decorate([
    (0, typeorm_1.Entity)()
], SubSubSubItem);
//# sourceMappingURL=subSubSubItem.entity.js.map