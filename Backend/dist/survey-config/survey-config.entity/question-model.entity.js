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
exports.QuestionModel = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const option_entity_1 = require("./option.entity");
const swagger_1 = require("@nestjs/swagger");
let QuestionModel = class QuestionModel {
    id;
    text;
    type;
    required;
    parentQuestionId;
    parentQuestion;
    options;
};
exports.QuestionModel = QuestionModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text of the sub-question or question model' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionModel.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of the sub-question', enum: ['single', 'multiple'] }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionModel.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the sub-question is required', default: false }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuestionModel.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.questionModels),
    (0, swagger_1.ApiProperty)({ description: 'ParentQuestion Id' }),
    __metadata("design:type", String)
], QuestionModel.prototype, "parentQuestionId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_entity_1.Option, option => option.question, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], QuestionModel.prototype, "options", void 0);
exports.QuestionModel = QuestionModel = __decorate([
    (0, typeorm_1.Entity)('question-models')
], QuestionModel);
//# sourceMappingURL=question-model.entity.js.map