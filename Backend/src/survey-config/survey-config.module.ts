/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyConfig } from './survey-config.entity/survey-config.entity';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { Question } from './survey-config.entity/question.entity';;
import { Option } from './survey-config.entity/option.entity';;
import { QuestionModel } from './survey-config.entity/question-model.entity';;
import { SurveyConfigController } from './survey-config.controller';
import { SurveyConfigService } from './survey-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyConfig, QuestionGroup, Question, Option, QuestionModel])],
  controllers: [SurveyConfigController],
  providers: [SurveyConfigController, SurveyConfigService],
})
export class SurveyConfigModule {}
