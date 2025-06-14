"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyConfigModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const questionGroup_entity_1 = require("./survey-config.entity/questionGroup.entity");
const question_entity_1 = require("./survey-config.entity/question.entity");
;
const option_entity_1 = require("./survey-config.entity/option.entity");
;
const question_model_entity_1 = require("./survey-config.entity/question-model.entity");
;
const survey_config_controller_1 = require("./survey-config.controller");
const survey_config_service_1 = require("./survey-config.service");
const survey_entity_1 = require("./survey-config.entity/survey.entity");
const answer_entity_1 = require("./survey-config.entity/answer.entity");
const subSubItemAnswer_entity_1 = require("./survey-config.entity/subSubItemAnswer.entity");
const subsubitem_entity_1 = require("../module/module.entity/subsubitem.entity");
let SurveyConfigModule = class SurveyConfigModule {
};
exports.SurveyConfigModule = SurveyConfigModule;
exports.SurveyConfigModule = SurveyConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subsubitem_entity_1.SubSubItem, survey_entity_1.Survey, questionGroup_entity_1.QuestionGroup, question_entity_1.Question, option_entity_1.Option, question_model_entity_1.QuestionModel, answer_entity_1.Answer, subSubItemAnswer_entity_1.SubSubItemAnswer])],
        controllers: [survey_config_controller_1.SurveyConfigController],
        providers: [survey_config_service_1.SurveyConfigService],
    })
], SurveyConfigModule);
//# sourceMappingURL=survey-config.module.js.map