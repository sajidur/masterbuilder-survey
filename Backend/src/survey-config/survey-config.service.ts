/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyConfig } from './survey-config.entity/survey-config.entity';
import { Repository } from 'typeorm/repository/Repository';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { QuestionGroupDto } from './survey-config.dto/questionGroup.dto';
import { Question } from './survey-config.entity/question.entity';
import {Option} from './survey-config.entity/option.entity'
import { QuestionModel } from './survey-config.entity/question-model.entity';
@Injectable()
export class SurveyConfigService {

     constructor(
    @InjectRepository(SurveyConfig)
    private readonly surveyRepository: Repository<SurveyConfig>,
     @InjectRepository(QuestionGroup) private questionGroupRepo: Repository<QuestionGroup>,
       @InjectRepository(Question) private readonly questionRepo: Repository<Question>,
        @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
        @InjectRepository(QuestionModel) private readonly questionModelRepository: Repository<QuestionModel>,
  ) {}
  //questionModel
    async createQuestionModel(data: QuestionModel): Promise<QuestionModel> {
    if (data.parentQuestionId) {
      const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
      if (!parent) throw new NotFoundException('Parent question not found');
      data.parentQuestion = parent;
    }

    const newModel = this.questionModelRepository.create(data);
    return await this.questionModelRepository.save(newModel);
  }

  async getAllQuestionModels(): Promise<QuestionModel[]> {
    return await this.questionModelRepository.find({
      relations: ['parentQuestion'],
    });
  }

  async getQuestionModelById(id: string): Promise<QuestionModel> {
    const model = await this.questionModelRepository.findOne({
      where: { id },
      relations: ['parentQuestion'],
    });
    if (!model) throw new NotFoundException('Question model not found');
    return model;
  }

  async updateQuestionModel(id: string, data: QuestionModel): Promise<QuestionModel> {
    const existing = await this.getQuestionModelById(id);

    if (data.parentQuestionId) {
      const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
      if (!parent) throw new NotFoundException('Parent question not found');
      existing.parentQuestion = parent;
    } 
    existing.text = data.text;
    existing.type = data.type;
    existing.required = data.required;

    return await this.questionModelRepository.save(existing);
  }

  async deleteQuestionModel(id: string): Promise<void> {
    const existing = await this.getQuestionModelById(id);
    await this.questionModelRepository.remove(existing);
  }
  //option
  async createOption(option: Option): Promise<Option> {
    if (option.questionId) {
      const question = await this.questionRepo.findOne({ where: { id: option.questionId } });
      if (!question) throw new NotFoundException('Question not found');
      option.question = question;
    }

    if (option.questionModelId) {
      const questionModel = await this.questionModelRepository.findOne({ where: { id: option.questionModelId } });
      if (!questionModel) throw new NotFoundException('QuestionModel not found');
      option.questionModel = questionModel;
    }

    const newOption = this.optionRepository.create(option);
    return await this.optionRepository.save(newOption);
  }

  async getAllOptions(): Promise<Option[]> {
    return await this.optionRepository.find({
      relations: ['question', 'questionModel'],
    });
  }

  async getOptionById(id: string): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['question', 'questionModel'],
    });

    if (!option) throw new NotFoundException('Option not found');
    return option;
  }

  async updateOption(id: string, update: Option): Promise<Option> {
    const existing = await this.getOptionById(id);

    if (update.questionId) {
      const question = await this.questionRepo.findOne({ where: { id: update.questionId } });
      if (!question) throw new NotFoundException('Question not found');
      existing.question = question;
    } 

    if (update.questionModelId) {
      const questionModel = await this.questionModelRepository.findOne({ where: { id: update.questionModelId } });
      if (!questionModel) throw new NotFoundException('QuestionModel not found');
      existing.questionModel = questionModel;
    } 

    existing.text = update.text;
    existing.value = update.value;

    return await this.optionRepository.save(existing);
  }

  async deleteOption(id: string): Promise<void> {
    const option = await this.getOptionById(id);
    await this.optionRepository.remove(option);
  }
  //question
  async createQuestion(question: Question): Promise<Question> {
    const group = await this.questionGroupRepo.findOne({
      where: { id: question.questionGroupId },
    });

    if (!group) {
      throw new NotFoundException('QuestionGroup not found');
    }

    const newQuestion = this.questionRepo.create({
      ...question,
      questionGroup: group,
    });

    return await this.questionRepo.save(newQuestion);
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.questionRepo.find({
      relations: ['questionGroup', 'options', 'questionModels'],
    });
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['questionGroup', 'options', 'questionModels'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async updateQuestion(id: string, updated: Question): Promise<Question> {
    const existing = await this.getQuestionById(id);

    const group = await this.questionRepo.findOne({
      where: { id: updated.questionGroup?.id },
    });

    if (!group) {
      throw new NotFoundException('QuestionGroup not found');
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

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.getQuestionById(id);
    await this.questionRepo.remove(question);
  }
  //surveyconfig
  async create(createSurveyDto: SurveyConfig): Promise<SurveyConfig> {
    const survey = this.surveyRepository.create(createSurveyDto);
    return this.surveyRepository.save(survey);
  }

  async findAll(): Promise<SurveyConfig[]> {
    return this.surveyRepository.find();
  }

  async findOne(id: string): Promise<SurveyConfig> {
    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return survey;
  }

  async update(id: string, updateSurveyDto: SurveyConfig): Promise<SurveyConfig> {
    await this.surveyRepository.update(id, updateSurveyDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.surveyRepository.delete(id);
  }
  //questionGroup
  async createQuestionGroup(dto: QuestionGroup): Promise<QuestionGroupDto> {
    const surveyConfig = await this.surveyRepository.findOne({
      where: { id: dto.surveyConfigId },
    });

    if (!surveyConfig) {
      throw new NotFoundException('SurveyConfig not found');
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
async getAllQuestionGroups(): Promise<QuestionGroupDto[]> {
  const questionGroups = await this.questionGroupRepo.find();

  const result = await Promise.all(
    questionGroups.map(async qg => {
      const surveyConfig = await this.surveyRepository.findOne({
        where: { id: qg.surveyConfigId },
      });

      return {
        title: qg.title,
        description: qg.description,
        surveyConfig: surveyConfig!, // Add null check if needed
      };
    })
  );

  return result;
}



  async getQuestionGroupById(id: string): Promise<QuestionGroupDto> {
    const qg = await this.questionGroupRepo.findOne({
      where: { id },
      relations: ['surveyConfig'],
    });

    if (!qg) throw new NotFoundException('QuestionGroup not found');
 const surveyConfig = await this.surveyRepository.findOne({
      where: { id: qg.surveyConfigId },
    });

    if (!surveyConfig) {
      throw new NotFoundException('SurveyConfig not found');
    }
    return {
      title: qg.title,
      description: qg.description,
      surveyConfig: surveyConfig,
    };
  }

  async updateQuestionGroup(
    id: string,
    dto: QuestionGroup,
  ): Promise<QuestionGroupDto> {
    const qg = await this.questionGroupRepo.findOne({
      where: { id },
      relations: ['surveyConfig'],
    });

    if (!qg) throw new NotFoundException('QuestionGroup not found');

    const surveyConfig = await this.surveyRepository.findOne({
      where: { id: dto.surveyConfigId },
    });

    if (!surveyConfig) throw new NotFoundException('SurveyConfig not found');

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

  async deleteQuestionGroup(id: string): Promise<{ message: string }> {
    const qg = await this.questionGroupRepo.findOne({ where: { id } });

    if (!qg) throw new NotFoundException('QuestionGroup not found');

    await this.questionGroupRepo.remove(qg);

    return { message: 'QuestionGroup deleted successfully' };
  }
}
