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
exports.Option = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const question_model_entity_1 = require("./question-model.entity");
const swagger_1 = require("@nestjs/swagger");
let Option = class Option {
    id;
    text;
    value;
    questionId;
    question;
    questionModelId;
    questionModel;
};
exports.Option = Option;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Option.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text of the option' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Option.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Value associated with the option' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Option.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Related question, if the option belongs directly to a question', required: false }),
    __metadata("design:type", String)
], Option.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.options, { nullable: true }),
    __metadata("design:type", question_entity_1.Question)
], Option.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Related question model, if the option belongs to a sub-question or question model', required: false }),
    __metadata("design:type", String)
], Option.prototype, "questionModelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_model_entity_1.QuestionModel, questionModel => questionModel.options, { nullable: true }),
    __metadata("design:type", question_model_entity_1.QuestionModel)
], Option.prototype, "questionModel", void 0);
exports.Option = Option = __decorate([
    (0, typeorm_1.Entity)('options')
], Option);
//# sourceMappingURL=option.entity.js.map