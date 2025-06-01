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
const question_entity_1 = require("./question.entity");
const swagger_1 = require("@nestjs/swagger");
const survey_entity_1 = require("./survey.entity");
let QuestionGroup = class QuestionGroup {
    id;
    title;
    description;
    survey;
    questions;
};
exports.QuestionGroup = QuestionGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionGroup.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionGroup.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_entity_1.Survey, survey => survey.questionGroups, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'surveyId' }),
    __metadata("design:type", survey_entity_1.Survey)
], QuestionGroup.prototype, "survey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, q => q.questionGroup, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], QuestionGroup.prototype, "questions", void 0);
exports.QuestionGroup = QuestionGroup = __decorate([
    (0, typeorm_1.Entity)('questionGroups')
], QuestionGroup);
//# sourceMappingURL=questionGroup.entity.js.map