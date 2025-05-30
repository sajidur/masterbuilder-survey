/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveyConfig } from './survey-config.entity/survey-config.entity';

import { SurveyConfigService } from './survey-config.service';
import { QuestionGroupDto } from './survey-config.dto/questionGroup.dto';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { Question } from './survey-config.entity/question.entity';
import {Option} from './survey-config.entity/option.entity'
import { QuestionModel } from './survey-config.entity/question-model.entity';
@ApiTags('Surveys')
@Controller('surveyConfig')
export class SurveyConfigController {



  constructor(private readonly surveyService: SurveyConfigService) {}

  @Post('addSurveyConfig')
  @ApiOperation({ summary: 'Create a new surveyconfig configuration' })
  @ApiResponse({ status: 201, description: 'Surveyconfig created successfully', type: SurveyConfig })
  create(@Body() createSurveyDto: SurveyConfig): Promise<SurveyConfig> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.surveyService.create(createSurveyDto);
  }

  @Get('allSurveyconfigs')
  @ApiOperation({ summary: 'Retrieve all survey configurations' })
  @ApiResponse({ status: 200, description: 'List of surveys', type: [SurveyConfig] })
  findAll(): Promise<SurveyConfig[]> {
    return this.surveyService.findAll();
  }

  @Get('getSurveyconfig:id')
  @ApiOperation({ summary: 'Retrieve a survey configuration by ID' })
  @ApiResponse({ status: 200, description: 'Survey details', type: SurveyConfig })
  findOne(@Param('id') id: string): Promise<SurveyConfig> {
    return this.surveyService.findOne(id);
  }

  @Put('updateSurveyconfig:id')
  @ApiOperation({ summary: 'Update a survey configuration' })
  @ApiResponse({ status: 200, description: 'Survey updated successfully', type: SurveyConfig })
  update(@Param('id') id: string, @Body() updateSurveyDto: SurveyConfig): Promise<SurveyConfig> {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete('deleteSurveyconfig:id')
  @ApiOperation({ summary: 'Delete a survey configuration' })
  @ApiResponse({ status: 200, description: 'Survey deleted successfully' })
  remove(@Param('id') id: string): Promise<void> {
    return this.surveyService.remove(id);
  }

//questionGroup
 @Post('addQuestionGroup')
  createquestionGroup(@Body() dto: QuestionGroup): Promise<QuestionGroupDto> {
    return this.surveyService.createQuestionGroup(dto);
  }
   @Get('allQuestionGroups')
  async getAllQuestionGroups(): Promise<QuestionGroupDto[]> {
    return await this.surveyService.getAllQuestionGroups();
  }

  @Get('getQuestionGroup:id')
  getQuestionGroupById(@Param('id') id: string): Promise<QuestionGroupDto> {
    return this.surveyService.getQuestionGroupById(id);
  }

  @Put('updateQuestionGroup:id')
  updateQuestionGroup(
    @Param('id') id: string,
    @Body() dto: QuestionGroup,
  ): Promise<QuestionGroupDto> {
    return this.surveyService.updateQuestionGroup(id, dto);
  }

  @Delete('deleteQuestionGroup:id')
  deleteQuestionGroup(@Param('id') id: string): Promise<{ message: string }> {
    return this.surveyService.deleteQuestionGroup(id);
  }
//question
 @Post('add-question')
  createQuestion(@Body() question: Question): Promise<Question> {
    return this.surveyService.createQuestion(question);
  }

  @Get('get-all-questions')
  getAllQuestions(): Promise<Question[]> {
    return this.surveyService.getAllQuestions();
  }

  @Get('get-question/:id')
  getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.surveyService.getQuestionById(id);
  }

  @Put('update-question/:id')
  updateQuestion(
    @Param('id') id: string,
    @Body() updatedQuestion: Question,
  ): Promise<Question> {
    return this.surveyService.updateQuestion(id, updatedQuestion);
  }

  @Delete('delete-question/:id')
  deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.surveyService.deleteQuestion(id);
  }
  //option
   @Post('add-option')
  createOption(@Body() option: Option): Promise<Option> {
    return this.surveyService.createOption(option);
  }

  @Get('get-all-options')
  getAllOptions(): Promise<Option[]> {
    return this.surveyService.getAllOptions();
  }

  @Get('get-option/:id')
  getOptionById(@Param('id') id: string): Promise<Option> {
    return this.surveyService.getOptionById(id);
  }

  @Put('update-option/:id')
  updateOption(@Param('id') id: string, @Body() update: Option): Promise<Option> {
    return this.surveyService.updateOption(id, update);
  }

  @Delete('delete-option/:id')
  deleteOption(@Param('id') id: string): Promise<void> {
    return this.surveyService.deleteOption(id);
  }
  //questionmodel
   @Post('add-questionmodel')
  createQuestionModel(@Body() model: QuestionModel): Promise<QuestionModel> {
    return this.surveyService.createQuestionModel(model);
  }

  @Get('get-all-questionmodels')
  getAllQuestionModel(): Promise<QuestionModel[]> {
    return this.surveyService.getAllQuestionModels();
  }

  @Get('get-questionmodel/:id')
  getByIdQuestionModel(@Param('id') id: string): Promise<QuestionModel> {
    return this.surveyService.getQuestionModelById(id);
  }

  @Put('update-questionmodel/:id')
  updateQuestionModel(@Param('id') id: string, @Body() model: QuestionModel): Promise<QuestionModel> {
    return this.surveyService.updateQuestionModel(id, model);
  }

  @Delete('delete-questionmodel/:id')
  deleteQuestionModel(@Param('id') id: string): Promise<void> {
    return this.surveyService.deleteQuestionModel(id);
  }
}
