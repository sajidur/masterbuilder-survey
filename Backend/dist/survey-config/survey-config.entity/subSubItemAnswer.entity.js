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
exports.SubSubItemAnswer = void 0;
const subsubitem_entity_1 = require("../../survey-module/survey-module.entity/subsubitem.entity");
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
let SubSubItemAnswer = class SubSubItemAnswer {
    id;
    subSubItem;
    answer;
    createdAt;
    updatedAt;
};
exports.SubSubItemAnswer = SubSubItemAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubSubItemAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subsubitem_entity_1.SubSubItem, (subSubItem) => subSubItem.subSubItemAnswers, { onDelete: 'CASCADE' }),
    __metadata("design:type", subsubitem_entity_1.SubSubItem)
], SubSubItemAnswer.prototype, "subSubItem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => answer_entity_1.Answer, (answer) => answer.subSubItemAnswers, { onDelete: 'CASCADE' }),
    __metadata("design:type", answer_entity_1.Answer)
], SubSubItemAnswer.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubSubItemAnswer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SubSubItemAnswer.prototype, "updatedAt", void 0);
exports.SubSubItemAnswer = SubSubItemAnswer = __decorate([
    (0, typeorm_1.Entity)()
], SubSubItemAnswer);
//# sourceMappingURL=subSubItemAnswer.entity.js.map