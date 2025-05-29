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
exports.Field = void 0;
const typeorm_1 = require("typeorm");
const subitem_entity_1 = require("../survey-module.entity/subitem.entity");
const swagger_1 = require("@nestjs/swagger");
let Field = class Field {
    id;
    name;
    type;
    subItemId;
    subItem;
};
exports.Field = Field;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Field.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Name of the field' }),
    __metadata("design:type", String)
], Field.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of the field' }),
    __metadata("design:type", String)
], Field.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SubItem ID' }),
    __metadata("design:type", Number)
], Field.prototype, "subItemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subitem_entity_1.SubItem, (subItem) => subItem.fields),
    __metadata("design:type", subitem_entity_1.SubItem)
], Field.prototype, "subItem", void 0);
exports.Field = Field = __decorate([
    (0, typeorm_1.Entity)()
], Field);
//# sourceMappingURL=field.entity.js.map