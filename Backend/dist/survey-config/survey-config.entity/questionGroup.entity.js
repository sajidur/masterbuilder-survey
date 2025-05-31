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
exports.QuestionGroup = void 0;
const typeorm_1 = require("typeorm");
const survey_config_entity_1 = require("./survey-config.entity");
const question_entity_1 = require("./question.entity");
const swagger_1 = require("@nestjs/swagger");
let QuestionGroup = class QuestionGroup {
    id;
    title;
    description;
    surveyConfigId;
    surveyConfig;
    questions;
};
exports.QuestionGroup = QuestionGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionGroup.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the question group' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionGroup.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the question group' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionGroup.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SurveyConfig ID' }),
    __metadata("design:type", String)
], QuestionGroup.prototype, "surveyConfigId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_config_entity_1.SurveyConfig, survey => survey.questionGroups),
    __metadata("design:type", survey_config_entity_1.SurveyConfig)
], QuestionGroup.prototype, "surveyConfig", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, question => question.questionGroup, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], QuestionGroup.prototype, "questions", void 0);
exports.QuestionGroup = QuestionGroup = __decorate([
    (0, typeorm_1.Entity)('questionGroups')
], QuestionGroup);
//# sourceMappingURL=questionGroup.entity.js.map