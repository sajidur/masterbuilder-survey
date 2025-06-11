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
exports.CreateSurveyDto = exports.UpdateSurveyDto = void 0;
const class_validator_1 = require("class-validator");
const create_question_group_dto_1 = require("./create-question-group.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UpdateSurveyDto {
    title;
    description;
}
exports.UpdateSurveyDto = UpdateSurveyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSurveyDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSurveyDto.prototype, "description", void 0);
class CreateSurveyDto {
    title;
    description;
    questionGroups;
}
exports.CreateSurveyDto = CreateSurveyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the survey', example: 'Customer Feedback Survey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSurveyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description of the survey', example: 'Survey to understand customer satisfaction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSurveyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of question groups within the survey', type: [create_question_group_dto_1.CreateQuestionGroupDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_question_group_dto_1.CreateQuestionGroupDto),
    __metadata("design:type", Array)
], CreateSurveyDto.prototype, "questionGroups", void 0);
//# sourceMappingURL=survey.dto.js.map