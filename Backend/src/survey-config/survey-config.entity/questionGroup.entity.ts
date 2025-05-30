/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SurveyConfig } from './survey-config.entity';
import { Question } from './question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('questionGroups')
export class QuestionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Title of the question group' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Description of the question group' })
  @Column()
  description: string;

  @ApiProperty({ description: 'SurveyConfig ID' })
  surveyConfigId: string;
  @ManyToOne(() => SurveyConfig, survey => survey.questionGroups)
  surveyConfig: SurveyConfig;

  @OneToMany(() => Question, question => question.questionGroup, {
    cascade: true,
    eager: true,
  })
  questions: Question[];
}
