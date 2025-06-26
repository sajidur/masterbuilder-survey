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
exports.SubItem = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("./item.entity");
const subsubitem_entity_1 = require("./subsubitem.entity");
let SubItem = class SubItem {
    id;
    name;
    tier;
    itemId;
    item;
    subSubItems;
    templateId;
    userId;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.SubItem = SubItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubItem.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item, (item) => item.subItems, { nullable: true }),
    __metadata("design:type", item_entity_1.Item)
], SubItem.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subsubitem_entity_1.SubSubItem, (subSubItem) => subSubItem.subItem),
    __metadata("design:type", Array)
], SubItem.prototype, "subSubItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubItem.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubItem.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SubItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubItem.prototype, "updatedBy", void 0);
exports.SubItem = SubItem = __decorate([
    (0, typeorm_1.Entity)()
], SubItem);
//# sourceMappingURL=subitem.entity.js.map