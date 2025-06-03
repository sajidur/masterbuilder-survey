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
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const questionGroup_entity_1 = require("./survey-config.entity/questionGroup.entity");
const question_entity_1 = require("./survey-config.entity/question.entity");
const option_entity_1 = require("./survey-config.entity/option.entity");
const question_model_entity_1 = require("./survey-config.entity/question-model.entity");
const common_1 = require("@nestjs/common");
const survey_entity_1 = require("./survey-config.entity/survey.entity");
const answer_entity_1 = require("./survey-config.entity/answer.entity");
const subSubItemAnswer_entity_1 = require("./survey-config.entity/subSubItemAnswer.entity");
let SurveyConfigService = class SurveyConfigService {
    questionGroupRepo;
    questionRepo;
    optionRepository;
    questionModelRepository;
    surveyRepository;
    answerRepository;
    subSubItemAnswerRepository;
    constructor(questionGroupRepo, questionRepo, optionRepository, questionModelRepository, surveyRepository, answerRepository, subSubItemAnswerRepository) {
        this.questionGroupRepo = questionGroupRepo;
        this.questionRepo = questionRepo;
        this.optionRepository = optionRepository;
        this.questionModelRepository = questionModelRepository;
        this.surveyRepository = surveyRepository;
        this.answerRepository = answerRepository;
        this.subSubItemAnswerRepository = subSubItemAnswerRepository;
    }
    async create(createSurveyDto) {
        try {
            const survey = this.surveyRepository.create({
                title: createSurveyDto.title,
                description: createSurveyDto.description,
                questionGroups: createSurveyDto.questionGroups.map(groupDto => ({
                    title: groupDto.title,
                    description: groupDto.description,
                    questions: groupDto.questions.map(questionDto => ({
                        text: questionDto.text,
                        type: questionDto.type,
                        required: questionDto.required,
                        answer: questionDto.answer,
                        options: questionDto.options?.map(optionDto => ({
                            text: optionDto.text,
                            value: optionDto.value,
                        })) || [],
                        questionModels: questionDto.questionModels?.map(modelDto => ({
                            text: modelDto.text,
                            type: modelDto.type,
                            required: modelDto.required,
                            options: modelDto.options?.map(opt => ({
                                text: opt.text,
                                value: opt.value,
                            })) || [],
                        })) || [],
                    })),
                })),
            });
            return await this.surveyRepository.save(survey);
        }
        catch (error) {
            console.error('❌ Error creating survey:', error);
            throw new common_1.InternalServerErrorException('Failed to create survey');
        }
    }
    findAll() {
        return this.surveyRepository.find({ relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options'] });
    }
    async findOne(id) {
        const survey = await this.surveyRepository.findOne({
            where: { id },
            relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options']
        });
        if (!survey)
            throw new common_1.NotFoundException('Survey not found');
        return survey;
    }
    async update(id, updateSurveyDto) {
        const existingSurvey = await this.surveyRepository.findOne({
            where: { id },
            relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options'],
        });
        if (!existingSurvey) {
            throw new common_1.NotFoundException(`Survey with ID ${id} not found`);
        }
        await this.surveyRepository.update(id, {
            title: updateSurveyDto.title,
            description: updateSurveyDto.description,
            questionGroups: [],
        });
        const updatedSurvey = this.surveyRepository.create({
            id,
            title: updateSurveyDto.title,
            description: updateSurveyDto.description,
            questionGroups: updateSurveyDto.questionGroups.map(groupDto => ({
                title: groupDto.title,
                description: groupDto.description,
                questions: groupDto.questions.map(questionDto => ({
                    text: questionDto.text,
                    type: questionDto.type,
                    required: questionDto.required,
                    answer: questionDto.answer,
                    options: questionDto.options?.map(optionDto => ({
                        text: optionDto.text,
                        value: optionDto.value,
                    })) || [],
                    questionModels: questionDto.questionModels?.map(modelDto => ({
                        text: modelDto.text,
                        type: modelDto.type,
                        required: modelDto.required,
                        options: modelDto.options?.map(opt => ({
                            text: opt.text,
                            value: opt.value,
                        })) || [],
                    })) || [],
                })),
            })),
        });
        return await this.surveyRepository.save(updatedSurvey);
    }
    async remove(id) {
        const survey = await this.findOne(id);
        return this.surveyRepository.remove(survey);
    }
    async createanswer(createAnswerDto) {
        const answer = new answer_entity_1.Answer();
        answer.userId = createAnswerDto.userId;
        answer.text = createAnswerDto.text ?? null;
        answer.selectedOptionIds = createAnswerDto.selectedOptionIds ?? [];
        if (createAnswerDto.questionId) {
            const question = await this.questionRepo.findOneBy({ id: createAnswerDto.questionId });
            if (!question)
                throw new common_1.NotFoundException('Question not found');
            answer.question = question;
        }
        if (createAnswerDto.questionModelId) {
            const model = await this.questionModelRepository.findOneBy({ id: createAnswerDto.questionModelId });
            if (!model)
                throw new common_1.NotFoundException('Question Model not found');
            answer.questionModel = model;
        }
        return this.answerRepository.save(answer);
    }
    async findOneAnswer(id) {
        const answer = await this.answerRepository.findOne({
            where: { id },
            relations: ['question', 'questionModel'],
        });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        return answer;
    }
    async updateAnswer(id, updateDto) {
        const answer = await this.answerRepository.findOne({ where: { id } });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        answer.userId = updateDto.userId;
        answer.text = updateDto.text ?? null;
        answer.selectedOptionIds = updateDto.selectedOptionIds ?? [];
        if (updateDto.questionId) {
            const question = await this.questionRepo.findOneBy({ id: updateDto.questionId });
            if (!question)
                throw new common_1.NotFoundException('Question not found');
            answer.question = question;
        }
        if (updateDto.questionModelId) {
            const model = await this.questionModelRepository.findOneBy({ id: updateDto.questionModelId });
            if (!model)
                throw new common_1.NotFoundException('Question Model not found');
            answer.questionModel = model;
        }
        return await this.answerRepository.save(answer);
    }
    async removeAnswer(id) {
        const result = await this.answerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
    }
    async createSubAns(dto) {
        const subSubItem = await this.subSubItemAnswerRepository.findOne({ where: { id: dto.subSubItemId } });
        if (!subSubItem) {
            throw new common_1.NotFoundException(`SubSubItem with ID ${dto.subSubItemId} not found`);
        }
        const answer = await this.answerRepository.findOne({ where: { id: dto.answerId } });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${dto.answerId} not found`);
        }
        const entity = this.subSubItemAnswerRepository.create({
            subSubItem,
            answer,
        });
        return this.subSubItemAnswerRepository.save(entity);
    }
    async findAllSubAns() {
        return this.subSubItemAnswerRepository.find({
            relations: ['subSubItem', 'answer'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByIdSubAns(id) {
        const entry = await this.subSubItemAnswerRepository.findOne({
            where: { id },
            relations: ['subSubItem', 'answer'],
        });
        if (!entry) {
            throw new common_1.NotFoundException(`SubSubItemAnswer with ID ${id} not found`);
        }
        return entry;
    }
    async deleteSubAns(id) {
        const result = await this.subSubItemAnswerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubSubItemAnswer with ID ${id} not found`);
        }
    }
};
exports.SurveyConfigService = SurveyConfigService;
exports.SurveyConfigService = SurveyConfigService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(questionGroup_entity_1.QuestionGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, typeorm_1.InjectRepository)(option_entity_1.Option)),
    __param(3, (0, typeorm_1.InjectRepository)(question_model_entity_1.QuestionModel)),
    __param(4, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(5, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __param(6, (0, typeorm_1.InjectRepository)(subSubItemAnswer_entity_1.SubSubItemAnswer)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository])
], SurveyConfigService);
//# sourceMappingURL=survey-config.service.js.map