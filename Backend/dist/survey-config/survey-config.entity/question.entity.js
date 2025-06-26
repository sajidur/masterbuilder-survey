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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const questionGroup_entity_1 = require("./questionGroup.entity");
const option_entity_1 = require("./option.entity");
const question_model_entity_1 = require("./question-model.entity");
const swagger_1 = require("@nestjs/swagger");
const answer_entity_1 = require("./answer.entity");
let Question = class Question {
    id;
    text;
    answer;
    type;
    required;
    questionGroup;
    options;
    questionModels;
    answers;
    userId;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['single', 'multiple'] }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionGroup_entity_1.QuestionGroup, qg => qg.questions, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'questionGroupId' }),
    __metadata("design:type", questionGroup_entity_1.QuestionGroup)
], Question.prototype, "questionGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_entity_1.Option, o => o.question, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_model_entity_1.QuestionModel, qm => qm.parentQuestion, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Question.prototype, "questionModels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, answer => answer.question, { cascade: true }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "updatedBy", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('questions')
], Question);
//# sourceMappingURL=question.entity.js.map