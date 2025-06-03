/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
 
 
/* eslint-disable prettier/prettier */

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm/repository/Repository';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';

import { Question } from './survey-config.entity/question.entity';
import {Option} from './survey-config.entity/option.entity'
import { QuestionModel } from './survey-config.entity/question-model.entity';
import { CreateQuestionGroupDto } from './survey-config.dto/create-question-group.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Survey } from './survey-config.entity/survey.entity';
import { CreateSurveyDto, UpdateSurveyDto } from './survey-config.dto/survey.dto';
import { Answer } from './survey-config.entity/answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './survey-config.dto/create-answer.dto';
import { SubSubItemAnswer } from './survey-config.entity/subSubItemAnswer.entity';
import { CreateSubSubItemAnswerDto } from './survey-config.dto/CreateSubSubItemAnswer.dto';

export class SurveyConfigService {
  
  
 constructor(
     @InjectRepository(QuestionGroup) private questionGroupRepo: Repository<QuestionGroup>,
     @InjectRepository(Question) private readonly questionRepo: Repository<Question>,
     @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
     @InjectRepository(QuestionModel) private readonly questionModelRepository: Repository<QuestionModel>,
     @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
     @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
      @InjectRepository(SubSubItemAnswer) private readonly subSubItemAnswerRepository: Repository<SubSubItemAnswer>,
  ) {}
async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
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
  } catch (error) {
    console.error('❌ Error creating survey:', error);
    throw new InternalServerErrorException('Failed to create survey');
  }
}


  findAll() {
    return this.surveyRepository.find({ relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options'] });
  }

  async findOne(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options']
    });
    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }

async update(id: number, updateSurveyDto: CreateSurveyDto): Promise<Survey> {
  const existingSurvey = await this.surveyRepository.findOne({
    where: { id },
    relations: ['questionGroups', 'questionGroups.questions', 'questionGroups.questions.options', 'questionGroups.questions.questionModels', 'questionGroups.questions.questionModels.options'],
  });

  if (!existingSurvey) {
    throw new NotFoundException(`Survey with ID ${id} not found`);
  }

  // Remove old question groups (cascade delete should be enabled in entity)
  await this.surveyRepository.update(id, {
    title: updateSurveyDto.title,
    description: updateSurveyDto.description,
    questionGroups: [],
  });

  // Build updated structure
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


  async remove(id: number) {
    const survey = await this.findOne(id);
    return this.surveyRepository.remove(survey);
  }

 async createanswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
  const answer = new Answer();
  answer.userId = createAnswerDto.userId;
  answer.text = createAnswerDto.text ?? null;  // Entity allows null
  answer.selectedOptionIds = createAnswerDto.selectedOptionIds ?? [];

  if (createAnswerDto.questionId) {
    const question = await this.questionRepo.findOneBy({ id: createAnswerDto.questionId });
    if (!question) throw new NotFoundException('Question not found');
    answer.question = question;
  }

  if (createAnswerDto.questionModelId) {
    const model = await this.questionModelRepository.findOneBy({ id: createAnswerDto.questionModelId });
    if (!model) throw new NotFoundException('Question Model not found');
    answer.questionModel = model;
  }

  return this.answerRepository.save(answer);
}


 async findOneAnswer(id: string): Promise<Answer> {
  const answer = await this.answerRepository.findOne({
    where: { id },
    relations: ['question', 'questionModel'], // preload relations if configured
  });

  if (!answer) {
    throw new NotFoundException(`Answer with ID ${id} not found`);
  }

  // If question relation exists but not loaded
  // if (!answer.question && answer['questionId']) {
  //   const question = await this.questionRepo.findOneBy({ id: answer['questionId'] });
  //   if (!question) {
  //     throw new NotFoundException(`Question with ID ${answer['questionId']} not found`);
  //   }
  //   answer.question = question;
  // }

  // // If questionModel relation exists but not loaded
  // if (!answer.questionModel && answer['questionModelId']) {
  //   const questionModel = await this.questionModelRepository.findOneBy({ id: answer['questionModelId'] });
  //   if (!questionModel) {
  //     throw new NotFoundException(`Question Model with ID ${answer['questionModelId']} not found`);
  //   }
  //   answer.questionModel = questionModel;
  // }

  return answer;
}


async updateAnswer(id: string, updateDto: UpdateAnswerDto): Promise<Answer> {
  const answer = await this.answerRepository.findOne({ where: { id } });
if (!answer) {
    throw new NotFoundException(`Answer with ID ${id} not found`);
  }
  answer.userId = updateDto.userId;
  answer.text = updateDto.text ?? null;  // Entity allows null
  answer.selectedOptionIds = updateDto.selectedOptionIds ?? [];

  if (updateDto.questionId) {
    const question = await this.questionRepo.findOneBy({ id: updateDto.questionId });
    if (!question) throw new NotFoundException('Question not found');
    answer.question = question;
  }

  if (updateDto.questionModelId) {
    const model = await this.questionModelRepository.findOneBy({ id: updateDto.questionModelId });
    if (!model) throw new NotFoundException('Question Model not found');
    answer.questionModel = model;
  }
  return await this.answerRepository.save(answer);
}

  async removeAnswer(id: string): Promise<void> {
    const result = await this.answerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
  }
 async createSubAns(dto: CreateSubSubItemAnswerDto): Promise<SubSubItemAnswer> {
    const subSubItem = await this.subSubItemAnswerRepository.findOne({ where: { id: dto.subSubItemId } });
    if (!subSubItem) {
      throw new NotFoundException(`SubSubItem with ID ${dto.subSubItemId} not found`);
    }

    const answer = await this.answerRepository.findOne({ where: { id: dto.answerId } });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${dto.answerId} not found`);
    }

    const entity = this.subSubItemAnswerRepository.create({
      subSubItem,
      answer,
    });

    return this.subSubItemAnswerRepository.save(entity);
  }

  async findAllSubAns(): Promise<SubSubItemAnswer[]> {
    return this.subSubItemAnswerRepository.find({
      relations: ['subSubItem', 'answer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByIdSubAns(id: number): Promise<SubSubItemAnswer> {
    const entry = await this.subSubItemAnswerRepository.findOne({
      where: { id },
      relations: ['subSubItem', 'answer'],
    });
    if (!entry) {
      throw new NotFoundException(`SubSubItemAnswer with ID ${id} not found`);
    }
    return entry;
  }

  async deleteSubAns(id: number): Promise<void> {
    const result = await this.subSubItemAnswerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubSubItemAnswer with ID ${id} not found`);
    }
  }


//   async getSurvey(): Promise<QuestionGroup[]> {
//     return this.questionGroupRepo.find();
//   }
//   questionModel
//     async createQuestionModel(data: QuestionModel): Promise<QuestionModel> {
//     if (data.parentQuestionId) {
//       const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
//       if (!parent) throw new NotFoundException('Parent question not found');
//       data.parentQuestion = parent;
//     }

//     const newModel = this.questionModelRepository.create(data);
//     return await this.questionModelRepository.save(newModel);
//   }

//   async getAllQuestionModels(): Promise<QuestionModel[]> {
//     return await this.questionModelRepository.find({
//       relations: ['parentQuestion'],
//     });
//   }

//   async getQuestionModelById(id: string): Promise<QuestionModel> {
//     const model = await this.questionModelRepository.findOne({
//       where: { id },
//       relations: ['parentQuestion'],
//     });
//     if (!model) throw new NotFoundException('Question model not found');
//     return model;
//   }

//   async updateQuestionModel(id: string, data: QuestionModel): Promise<QuestionModel> {
//     const existing = await this.getQuestionModelById(id);

//     if (data.parentQuestionId) {
//       const parent = await this.questionRepo.findOne({ where: { id: data.parentQuestionId } });
//       if (!parent) throw new NotFoundException('Parent question not found');
//       existing.parentQuestion = parent;
//     } 
//     existing.text = data.text;
//     existing.type = data.type;
//     existing.required = data.required;

//     return await this.questionModelRepository.save(existing);
//   }

//   async deleteQuestionModel(id: string): Promise<void> {
//     const existing = await this.getQuestionModelById(id);
//     await this.questionModelRepository.remove(existing);
//   }
//   //option
//   async createOption(option: Option): Promise<Option> {
//     if (option.questionId) {
//       const question = await this.questionRepo.findOne({ where: { id: option.questionId } });
//       if (!question) throw new NotFoundException('Question not found');
//       option.question = question;
//     }

//     if (option.questionModelId) {
//       const questionModel = await this.questionModelRepository.findOne({ where: { id: option.questionModelId } });
//       if (!questionModel) throw new NotFoundException('QuestionModel not found');
//       option.questionModel = questionModel;
//     }

//     const newOption = this.optionRepository.create(option);
//     return await this.optionRepository.save(newOption);
//   }

//   async getAllOptions(): Promise<Option[]> {
//     return await this.optionRepository.find({
//       relations: ['question', 'questionModel'],
//     });
//   }

//   async getOptionById(id: string): Promise<Option> {
//     const option = await this.optionRepository.findOne({
//       where: { id },
//       relations: ['question', 'questionModel'],
//     });

//     if (!option) throw new NotFoundException('Option not found');
//     return option;
//   }

//   async updateOption(id: string, update: Option): Promise<Option> {
//     const existing = await this.getOptionById(id);

//     if (update.questionId) {
//       const question = await this.questionRepo.findOne({ where: { id: update.questionId } });
//       if (!question) throw new NotFoundException('Question not found');
//       existing.question = question;
//     } 

//     if (update.questionModelId) {
//       const questionModel = await this.questionModelRepository.findOne({ where: { id: update.questionModelId } });
//       if (!questionModel) throw new NotFoundException('QuestionModel not found');
//       existing.questionModel = questionModel;
//     } 

//     existing.text = update.text;
//     existing.value = update.value;

//     return await this.optionRepository.save(existing);
//   }

//   async deleteOption(id: string): Promise<void> {
//     const option = await this.getOptionById(id);
//     await this.optionRepository.remove(option);
//   }
//   //question
//   async createQuestion(question: Question): Promise<Question> {
//     const group = await this.questionGroupRepo.findOne({
//       where: { id: question.questionGroupId },
//     });

//     if (!group) {
//       throw new NotFoundException('QuestionGroup not found');
//     }

//     const newQuestion = this.questionRepo.create({
//       ...question,
//       questionGroup: group,
//     });

//     return await this.questionRepo.save(newQuestion);
//   }

//   async getAllQuestions(): Promise<Question[]> {
//     return await this.questionRepo.find({
//       relations: ['questionGroup', 'options', 'questionModels'],
//     });
//   }

//   async getQuestionById(id: string): Promise<Question> {
//     const question = await this.questionRepo.findOne({
//       where: { id },
//       relations: ['questionGroup', 'options', 'questionModels'],
//     });

//     if (!question) {
//       throw new NotFoundException('Question not found');
//     }

//     return question;
//   }

//   async updateQuestion(id: string, updated: Question): Promise<Question> {
//     const existing = await this.getQuestionById(id);

//     const group = await this.questionRepo.findOne({
//       where: { id: updated.questionGroup?.id },
//     });

//     if (!group) {
//       throw new NotFoundException('QuestionGroup not found');
//     }

//     Object.assign(existing, {
//       text: updated.text,
//       type: updated.type,
//       required: updated.required,
//       questionGroup: group,
//       options: updated.options,
//       questionModels: updated.questionModels,
//     });

//     return await this.questionRepo.save(existing);
//   }

//   async deleteQuestion(id: string): Promise<void> {
//     const question = await this.getQuestionById(id);
//     await this.questionRepo.remove(question);
//   }
  
//   //questionGroup
//   async createQuestionGroup(dto: QuestionGroup): Promise<QuestionGroup> {
 

//     const questionGroup = this.questionGroupRepo.create({
//       title: dto.title,
//       description: dto.description,

//     });

//     return await this.questionGroupRepo.save(questionGroup);

    
//   }
// async getAllQuestionGroups(): Promise<QuestionGroup[]> {
//   return  await this.questionGroupRepo.find();
// }



//   async getQuestionGroupById(id: string): Promise<QuestionGroup> {
//     const qg = await this.questionGroupRepo.findOne({
//       where: { id }
//     });

//     if (!qg) throw new NotFoundException('QuestionGroup not found');

//     return qg;
//   }

//   async updateQuestionGroup(
//     id: string,
//     dto: QuestionGroup,
//   ): Promise<QuestionGroup> {
//     const qg = await this.questionGroupRepo.findOne({
//       where: { id } });

//     if (!qg) throw new NotFoundException('QuestionGroup not found');

  
    
//     qg.title = dto.title;
//     qg.description = dto.description;
  

//     return await this.questionGroupRepo.save(qg);

//   }

//   async deleteQuestionGroup(id: string): Promise<{ message: string }> {
//     const qg = await this.questionGroupRepo.findOne({ where: { id } });

//     if (!qg) throw new NotFoundException('QuestionGroup not found');

//     await this.questionGroupRepo.remove(qg);

//     return { message: 'QuestionGroup deleted successfully' };
//   }
}
