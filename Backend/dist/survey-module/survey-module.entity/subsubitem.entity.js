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
exports.SubSubItem = void 0;
const typeorm_1 = require("typeorm");
const subitem_entity_1 = require("../survey-module.entity/subitem.entity");
const field_entity_1 = require("../survey-module.entity/field.entity");
const subSubItemAnswer_entity_1 = require("../../survey-config/survey-config.entity/subSubItemAnswer.entity");
let SubSubItem = class SubSubItem {
    id;
    label;
    subItemId;
    subItem;
    fields;
    subSubItemAnswers;
};
exports.SubSubItem = SubSubItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubSubItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubSubItem.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SubSubItem.prototype, "subItemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subitem_entity_1.SubItem, (subItem) => subItem.subSubItems, { nullable: true }),
    __metadata("design:type", subitem_entity_1.SubItem)
], SubSubItem.prototype, "subItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => field_entity_1.Field, (field) => field.subSubItem),
    __metadata("design:type", Array)
], SubSubItem.prototype, "fields", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subSubItemAnswer_entity_1.SubSubItemAnswer, (ssa) => ssa.subSubItem),
    __metadata("design:type", Array)
], SubSubItem.prototype, "subSubItemAnswers", void 0);
exports.SubSubItem = SubSubItem = __decorate([
    (0, typeorm_1.Entity)()
], SubSubItem);
//# sourceMappingURL=subsubitem.entity.js.map