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
exports.SubSubSubItemDto = exports.CreateSubSubSubItemDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSubSubSubItemDto {
    name;
    tier;
    layout;
    serialNumber;
    templateId;
    templateText;
    subSubItemId;
    viewEntry;
}
exports.CreateSubSubSubItemDto = CreateSubSubSubItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the SubSubSubItem',
        example: 'Line Item 1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tier of the SubSubSubItem', example: 'Level 4' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "tier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'layout/Placement of the SubItem' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "layout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SerialNumber of the SubSubSubItem' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Template ID of the SubSubSubItem',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSubSubSubItemDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Template of text box of the SubSubSubItem',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSubSubSubItemDto.prototype, "templateText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the parent SubSubItem',
        example: 'uuid-subsubitem-789',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "subSubItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ViewEntry of the field' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubSubSubItemDto.prototype, "viewEntry", void 0);
class SubSubSubItemDto {
    id;
    name;
    tier;
    templateText;
    userId;
    subSubItemId;
    subSubItem;
    serialNumber;
    layout;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
    template;
    viewEntry;
}
exports.SubSubSubItemDto = SubSubSubItemDto;
//# sourceMappingURL=subsubsubitem.dto.js.map