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
exports.SubSubItemAnswerResponseDto = exports.CreateSubSubItemAnswerDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSubSubItemAnswerDto {
    subSubItemId;
    answerId;
}
exports.CreateSubSubItemAnswerDto = CreateSubSubItemAnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the SubSubItem', example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSubSubItemAnswerDto.prototype, "subSubItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the Answer', example: 'a1b2c3d4-5678-9101-1121-314151617181' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSubSubItemAnswerDto.prototype, "answerId", void 0);
class SubSubItemAnswerResponseDto {
    id;
    subSubItemId;
    answerId;
    createdAt;
    updatedAt;
}
exports.SubSubItemAnswerResponseDto = SubSubItemAnswerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the relationship' }),
    __metadata("design:type", Number)
], SubSubItemAnswerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SubSubItem ID' }),
    __metadata("design:type", Number)
], SubSubItemAnswerResponseDto.prototype, "subSubItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer ID' }),
    __metadata("design:type", String)
], SubSubItemAnswerResponseDto.prototype, "answerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], SubSubItemAnswerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last updated timestamp' }),
    __metadata("design:type", Date)
], SubSubItemAnswerResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=CreateSubSubItemAnswer.dto.js.map