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
exports.SurveyConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_config_entity_1 = require("./survey-config.entity/survey-config.entity");
const Repository_1 = require("typeorm/repository/Repository");
const questionGroup_entity_1 = require("./survey-config.entity/questionGroup.entity");
const question_entity_1 = require("./survey-config.entity/question.entity");
const option_entity_1 = require("./survey-config.entity/option.entity");
const question_model_entity_1 = require("./survey-config.entity/question-model.entity");
let SurveyConfigService = class SurveyConfigService {
    surveyRepository;
    questionGroupRepo;
    questionRepo;
    optionRepository;
    questionModelRepository;
    constructor(surveyRepository, questionGroupRepo, questionRepo, optionRepository, questionModelRepository) {
        this.surveyRepository = surveyRepository;
        this.questionGroupRepo = questionGroupRepo;
        this.questionRepo = questionRepo;
        this.optionRepository = optionRepository;
        this.questionModelRepository = questionModelRepository;
    }
    async createQuestionModel(data) {
        if (data.parentQuestionId) {
            const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
            if (!parent)
                throw new common_1.NotFoundException('Parent question not found');
            data.parentQuestion = parent;
        }
        const newModel = this.questionModelRepository.create(data);
        return await this.questionModelRepository.save(newModel);
    }
    async getAllQuestionModels() {
        return await this.questionModelRepository.find({
            relations: ['parentQuestion'],
        });
    }
    async getQuestionModelById(id) {
        const model = await this.questionModelRepository.findOne({
            where: { id },
            relations: ['parentQuestion'],
        });
        if (!model)
            throw new common_1.NotFoundException('Question model not found');
        return model;
    }
    async updateQuestionModel(id, data) {
        const existing = await this.getQuestionModelById(id);
        if (data.parentQuestionId) {
            const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
            if (!parent)
                throw new common_1.NotFoundException('Parent question not found');
            existing.parentQuestion = parent;
        }
        existing.text = data.text;
        existing.type = data.type;
        existing.required = data.required;
        return await this.questionModelRepository.save(existing);
    }
    async deleteQuestionModel(id) {
        const existing = await this.getQuestionModelById(id);
        await this.questionModelRepository.remove(existing);
    }
    async createOption(option) {
        if (option.questionId) {
            const question = await this.questionRepo.findOne({ where: { id: option.questionId } });
            if (!question)
                throw new common_1.NotFoundException('Question not found');
            option.question = question;
        }
        if (option.questionModelId) {
            const questionModel = await this.questionModelRepository.findOne({ where: { id: option.questionModelId } });
            if (!questionModel)
                throw new common_1.NotFoundException('QuestionModel not found');
            option.questionModel = questionModel;
        }
        const newOption = this.optionRepository.create(option);
        return await this.optionRepository.save(newOption);
    }
    async getAllOptions() {
        return await this.optionRepository.find({
            relations: ['question', 'questionModel'],
        });
    }
    async getOptionById(id) {
        const option = await this.optionRepository.findOne({
            where: { id },
            relations: ['question', 'questionModel'],
        });
        if (!option)
            throw new common_1.NotFoundException('Option not found');
        return option;
    }
    async updateOption(id, update) {
        const existing = await this.getOptionById(id);
        if (update.questionId) {
            const question = await this.questionRepo.findOne({ where: { id: update.questionId } });
            if (!question)
                throw new common_1.NotFoundException('Question not found');
            existing.question = question;
        }
        if (update.questionModelId) {
            const questionModel = await this.questionModelRepository.findOne({ where: { id: update.questionModelId } });
            if (!questionModel)
                throw new common_1.NotFoundException('QuestionModel not found');
            existing.questionModel = questionModel;
        }
        existing.text = update.text;
        existing.value = update.value;
        return await this.optionRepository.save(existing);
    }
    async deleteOption(id) {
        const option = await this.getOptionById(id);
        await this.optionRepository.remove(option);
    }
    async createQuestion(question) {
        const group = await this.questionGroupRepo.findOne({
            where: { id: question.questionGroupId },
        });
        if (!group) {
            throw new common_1.NotFoundException('QuestionGroup not found');
        }
        const newQuestion = this.questionRepo.create({
            ...question,
            questionGroup: group,
        });
        return await this.questionRepo.save(newQuestion);
    }
    async getAllQuestions() {
        return await this.questionRepo.find({
            relations: ['questionGroup', 'options', 'questionModels'],
        });
    }
    async getQuestionById(id) {
        const question = await this.questionRepo.findOne({
            where: { id },
            relations: ['questionGroup', 'options', 'questionModels'],
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        return question;
    }
    async updateQuestion(id, updated) {
        const existing = await this.getQuestionById(id);
        const group = await this.questionRepo.findOne({
            where: { id: updated.questionGroup?.id },
        });
        if (!group) {
            throw new common_1.NotFoundException('QuestionGroup not found');
        }
        Object.assign(existing, {
            text: updated.text,
            type: updated.type,
            required: updated.required,
            questionGroup: group,
            options: updated.options,
            questionModels: updated.questionModels,
        });
        return await this.questionRepo.save(existing);
    }
    async deleteQuestion(id) {
        const question = await this.getQuestionById(id);
        await this.questionRepo.remove(question);
    }
    async create(createSurveyDto) {
        const survey = this.surveyRepository.create(createSurveyDto);
        return this.surveyRepository.save(survey);
    }
    async findAll() {
        return this.surveyRepository.find();
    }
    async findOne(id) {
        const survey = await this.surveyRepository.findOne({ where: { id } });
        if (!survey) {
            throw new common_1.NotFoundException(`Survey with ID ${id} not found`);
        }
        return survey;
    }
    async update(id, updateSurveyDto) {
        await this.surveyRepository.update(id, updateSurveyDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.surveyRepository.delete(id);
    }
    async createQuestionGroup(dto) {
        const surveyConfig = await this.surveyRepository.findOne({
            where: { id: dto.surveyConfigId },
        });
        if (!surveyConfig) {
            throw new common_1.NotFoundException('SurveyConfig not found');
        }
        const questionGroup = this.questionGroupRepo.create({
            title: dto.title,
            description: dto.description,
            surveyConfigId: dto.surveyConfigId,
        });
        const saved = await this.questionGroupRepo.save(questionGroup);
        return {
            title: saved.title,
            description: saved.description,
            surveyConfig: surveyConfig,
        };
    }
    async getAllQuestionGroups() {
        const questionGroups = await this.questionGroupRepo.find();
        const result = await Promise.all(questionGroups.map(async (qg) => {
            const surveyConfig = await this.surveyRepository.findOne({
                where: { id: qg.surveyConfigId },
            });
            return {
                title: qg.title,
                description: qg.description,
                surveyConfig: surveyConfig,
            };
        }));
        return result;
    }
    async getQuestionGroupById(id) {
        const qg = await this.questionGroupRepo.findOne({
            where: { id },
            relations: ['surveyConfig'],
        });
        if (!qg)
            throw new common_1.NotFoundException('QuestionGroup not found');
        const surveyConfig = await this.surveyRepository.findOne({
            where: { id: qg.surveyConfigId },
        });
        if (!surveyConfig) {
            throw new common_1.NotFoundException('SurveyConfig not found');
        }
        return {
            title: qg.title,
            description: qg.description,
            surveyConfig: surveyConfig,
        };
    }
    async updateQuestionGroup(id, dto) {
        const qg = await this.questionGroupRepo.findOne({
            where: { id },
            relations: ['surveyConfig'],
        });
        if (!qg)
            throw new common_1.NotFoundException('QuestionGroup not found');
        const surveyConfig = await this.surveyRepository.findOne({
            where: { id: dto.surveyConfigId },
        });
        if (!surveyConfig)
            throw new common_1.NotFoundException('SurveyConfig not found');
        qg.title = dto.title;
        qg.description = dto.description;
        qg.surveyConfigId = dto.surveyConfigId;
        const updated = await this.questionGroupRepo.save(qg);
        return {
            title: updated.title,
            description: updated.description,
            surveyConfig: updated.surveyConfig,
        };
    }
    async deleteQuestionGroup(id) {
        const qg = await this.questionGroupRepo.findOne({ where: { id } });
        if (!qg)
            throw new common_1.NotFoundException('QuestionGroup not found');
        await this.questionGroupRepo.remove(qg);
        return { message: 'QuestionGroup deleted successfully' };
    }
};
exports.SurveyConfigService = SurveyConfigService;
exports.SurveyConfigService = SurveyConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_config_entity_1.SurveyConfig)),
    __param(1, (0, typeorm_1.InjectRepository)(questionGroup_entity_1.QuestionGroup)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(3, (0, typeorm_1.InjectRepository)(option_entity_1.Option)),
    __param(4, (0, typeorm_1.InjectRepository)(question_model_entity_1.QuestionModel)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository])
], SurveyConfigService);
//# sourceMappingURL=survey-config.service.js.map