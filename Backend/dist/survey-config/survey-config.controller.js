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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyConfigController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const survey_config_entity_1 = require("./survey-config.entity/survey-config.entity");
const survey_config_service_1 = require("./survey-config.service");
const questionGroup_entity_1 = require("./survey-config.entity/questionGroup.entity");
const question_entity_1 = require("./survey-config.entity/question.entity");
const option_entity_1 = require("./survey-config.entity/option.entity");
const question_model_entity_1 = require("./survey-config.entity/question-model.entity");
let SurveyConfigController = class SurveyConfigController {
    surveyService;
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    create(createSurveyDto) {
        return this.surveyService.create(createSurveyDto);
    }
    findAll() {
        return this.surveyService.findAll();
    }
    findOne(id) {
        return this.surveyService.findOne(id);
    }
    update(id, updateSurveyDto) {
        return this.surveyService.update(id, updateSurveyDto);
    }
    remove(id) {
        return this.surveyService.remove(id);
    }
    createquestionGroup(dto) {
        return this.surveyService.createQuestionGroup(dto);
    }
    async getAllQuestionGroups() {
        return await this.surveyService.getAllQuestionGroups();
    }
    getQuestionGroupById(id) {
        return this.surveyService.getQuestionGroupById(id);
    }
    updateQuestionGroup(id, dto) {
        return this.surveyService.updateQuestionGroup(id, dto);
    }
    deleteQuestionGroup(id) {
        return this.surveyService.deleteQuestionGroup(id);
    }
    createQuestion(question) {
        return this.surveyService.createQuestion(question);
    }
    getAllQuestions() {
        return this.surveyService.getAllQuestions();
    }
    getQuestionById(id) {
        return this.surveyService.getQuestionById(id);
    }
    updateQuestion(id, updatedQuestion) {
        return this.surveyService.updateQuestion(id, updatedQuestion);
    }
    deleteQuestion(id) {
        return this.surveyService.deleteQuestion(id);
    }
    createOption(option) {
        return this.surveyService.createOption(option);
    }
    getAllOptions() {
        return this.surveyService.getAllOptions();
    }
    getOptionById(id) {
        return this.surveyService.getOptionById(id);
    }
    updateOption(id, update) {
        return this.surveyService.updateOption(id, update);
    }
    deleteOption(id) {
        return this.surveyService.deleteOption(id);
    }
    createQuestionModel(model) {
        return this.surveyService.createQuestionModel(model);
    }
    getAllQuestionModel() {
        return this.surveyService.getAllQuestionModels();
    }
    getByIdQuestionModel(id) {
        return this.surveyService.getQuestionModelById(id);
    }
    updateQuestionModel(id, model) {
        return this.surveyService.updateQuestionModel(id, model);
    }
    deleteQuestionModel(id) {
        return this.surveyService.deleteQuestionModel(id);
    }
};
exports.SurveyConfigController = SurveyConfigController;
__decorate([
    (0, common_1.Post)('addSurveyConfig'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new surveyconfig configuration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Surveyconfig created successfully', type: survey_config_entity_1.SurveyConfig }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_config_entity_1.SurveyConfig]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('allSurveyconfigs'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all survey configurations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of surveys', type: [survey_config_entity_1.SurveyConfig] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getSurveyconfig:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a survey configuration by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey details', type: survey_config_entity_1.SurveyConfig }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('updateSurveyconfig:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a survey configuration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey updated successfully', type: survey_config_entity_1.SurveyConfig }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, survey_config_entity_1.SurveyConfig]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteSurveyconfig:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a survey configuration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('addQuestionGroup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [questionGroup_entity_1.QuestionGroup]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "createquestionGroup", null);
__decorate([
    (0, common_1.Get)('allQuestionGroups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getAllQuestionGroups", null);
__decorate([
    (0, common_1.Get)('getQuestionGroup:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getQuestionGroupById", null);
__decorate([
    (0, common_1.Put)('updateQuestionGroup:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, questionGroup_entity_1.QuestionGroup]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "updateQuestionGroup", null);
__decorate([
    (0, common_1.Delete)('deleteQuestionGroup:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "deleteQuestionGroup", null);
__decorate([
    (0, common_1.Post)('add-question'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_entity_1.Question]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)('get-all-questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Get)('get-question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Put)('update-question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_entity_1.Question]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)('delete-question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)('add-option'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [option_entity_1.Option]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "createOption", null);
__decorate([
    (0, common_1.Get)('get-all-options'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getAllOptions", null);
__decorate([
    (0, common_1.Get)('get-option/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getOptionById", null);
__decorate([
    (0, common_1.Put)('update-option/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, option_entity_1.Option]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "updateOption", null);
__decorate([
    (0, common_1.Delete)('delete-option/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "deleteOption", null);
__decorate([
    (0, common_1.Post)('add-questionmodel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_model_entity_1.QuestionModel]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "createQuestionModel", null);
__decorate([
    (0, common_1.Get)('get-all-questionmodels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getAllQuestionModel", null);
__decorate([
    (0, common_1.Get)('get-questionmodel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "getByIdQuestionModel", null);
__decorate([
    (0, common_1.Put)('update-questionmodel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_model_entity_1.QuestionModel]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "updateQuestionModel", null);
__decorate([
    (0, common_1.Delete)('delete-questionmodel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "deleteQuestionModel", null);
exports.SurveyConfigController = SurveyConfigController = __decorate([
    (0, swagger_1.ApiTags)('Surveys'),
    (0, common_1.Controller)('surveyConfig'),
    __metadata("design:paramtypes", [survey_config_service_1.SurveyConfigService])
], SurveyConfigController);
//# sourceMappingURL=survey-config.controller.js.map