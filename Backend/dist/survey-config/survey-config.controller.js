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
const survey_config_service_1 = require("./survey-config.service");
const swagger_1 = require("@nestjs/swagger");
const survey_dto_1 = require("./survey-config.dto/survey.dto");
let SurveyConfigController = class SurveyConfigController {
    surveyService;
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    async create(createSurveyDto) {
        try {
            return await this.surveyService.create(createSurveyDto);
        }
        catch (error) {
            console.error('Survey creation failed:', error.message, error.stack);
            throw error;
        }
    }
    findAll() {
        return this.surveyService.findAll();
    }
    findOne(id) {
        return this.surveyService.findOne(+id);
    }
    update(id, updateSurveyDto) {
        return this.surveyService.update(+id, updateSurveyDto);
    }
    remove(id) {
        return this.surveyService.remove(+id);
    }
};
exports.SurveyConfigController = SurveyConfigController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.CreateSurveyDto]),
    __metadata("design:returntype", Promise)
], SurveyConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveyConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, survey_dto_1.UpdateSurveyDto]),
    __metadata("design:returntype", void 0)
], SurveyConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveyConfigController.prototype, "remove", null);
exports.SurveyConfigController = SurveyConfigController = __decorate([
    (0, swagger_1.ApiTags)('Surveys'),
    (0, common_1.Controller)('surveyConfig'),
    __metadata("design:paramtypes", [survey_config_service_1.SurveyConfigService])
], SurveyConfigController);
//# sourceMappingURL=survey-config.controller.js.map