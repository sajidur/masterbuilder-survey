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
exports.UpdateAnswerDto = exports.CreateAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAnswerDto {
    userId;
    text;
    selectedOptionIds;
    questionId;
    questionModelId;
}
exports.CreateAnswerDto = CreateAnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who answered' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional text response' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Selected option IDs (comma-separated UUIDs)', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], CreateAnswerDto.prototype, "selectedOptionIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the main question being answered' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the sub-question (question model) being answered' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "questionModelId", void 0);
class UpdateAnswerDto {
    userId;
    text;
    selectedOptionIds;
    questionId;
    questionModelId;
}
exports.UpdateAnswerDto = UpdateAnswerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User ID who answered' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnswerDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional text response' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnswerDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Selected option IDs (array of UUIDs)', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], UpdateAnswerDto.prototype, "selectedOptionIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the main question being answered' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the sub-question (question model) being answered' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAnswerDto.prototype, "questionModelId", void 0);
//# sourceMappingURL=create-answer.dto.js.map