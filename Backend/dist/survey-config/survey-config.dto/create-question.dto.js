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
exports.CreateQuestionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_option_dto_1 = require("./create-option.dto");
const create_question_model_dto_1 = require("./create-question-model.dto");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
class CreateQuestionDto {
    text;
    type;
    required;
    answer;
    options;
    questionModels;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text of the question', example: 'How satisfied are you with our service?' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of the question', enum: ['single', 'multiple'], example: 'single' }),
    (0, class_validator_1.IsEnum)(['single', 'multiple']),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the question is required', example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuestionDto.prototype, "required", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pre-filled answer, if any', example: 'Very satisfied' }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Options available for the question', type: [create_option_dto_1.CreateOptionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_option_dto_1.CreateOptionDto),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Follow-up sub-questions based on this question', type: [create_question_model_dto_1.CreateQuestionModelDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_question_model_dto_1.CreateQuestionModelDto),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "questionModels", void 0);
//# sourceMappingURL=create-question.dto.js.map