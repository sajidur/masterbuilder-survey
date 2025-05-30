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
exports.SurveyConfig = void 0;
const typeorm_1 = require("typeorm");
const questionGroup_entity_1 = require("./questionGroup.entity");
const swagger_1 = require("@nestjs/swagger");
let SurveyConfig = class SurveyConfig {
    id;
    title;
    description;
    questionGroups;
};
exports.SurveyConfig = SurveyConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SurveyConfig.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the survey configuration' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SurveyConfig.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the survey configuration' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SurveyConfig.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questionGroup_entity_1.QuestionGroup, questionGroup => questionGroup.surveyConfig, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], SurveyConfig.prototype, "questionGroups", void 0);
exports.SurveyConfig = SurveyConfig = __decorate([
    (0, typeorm_1.Entity)('survey_configs')
], SurveyConfig);
//# sourceMappingURL=survey-config.entity.js.map