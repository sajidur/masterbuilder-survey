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
exports.UserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const option_entity_1 = require("./option.entity");
let UserResponse = class UserResponse {
    id;
    userId;
    questionId;
    question;
    optionId;
    selectedOption;
    textAnswer;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.UserResponse = UserResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserResponse.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserResponse.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", question_entity_1.Question)
], UserResponse.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Option ID (for single/multiple choice)',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => option_entity_1.Option, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'optionId' }),
    __metadata("design:type", option_entity_1.Option)
], UserResponse.prototype, "selectedOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text answer (if open-ended question)',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "textAnswer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "updatedBy", void 0);
exports.UserResponse = UserResponse = __decorate([
    (0, typeorm_1.Entity)('user_responses')
], UserResponse);
//# sourceMappingURL=user_responses.entity.js.map