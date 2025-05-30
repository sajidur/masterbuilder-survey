/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { QuestionGroup } from './questionGroup.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('survey_configs')
export class SurveyConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Title of the survey configuration' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Description of the survey configuration' })
  @Column()
  description: string;

  @OneToMany(() => QuestionGroup, questionGroup => questionGroup.surveyConfig, {
    cascade: true,
    eager: true,
  })
  questionGroups: QuestionGroup[];
}
