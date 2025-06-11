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
exports.CreateQuestionGroupDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_question_dto_1 = require("./create-question.dto");
const swagger_1 = require("@nestjs/swagger");
class CreateQuestionGroupDto {
    title;
    description;
    questions;
}
exports.CreateQuestionGroupDto = CreateQuestionGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the question group', example: 'General Questions' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the question group', example: 'Basic questions for customers' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionGroupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of questions in the group', type: [create_question_dto_1.CreateQuestionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_question_dto_1.CreateQuestionDto),
    __metadata("design:type", Array)
], CreateQuestionGroupDto.prototype, "questions", void 0);
//# sourceMappingURL=create-question-group.dto.js.map