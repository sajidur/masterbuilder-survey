/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('question-models')
export class QuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Text of the sub-question or question model' })
  @Column()
  text: string;

  @ApiProperty({ description: 'Type of the sub-question', enum: ['single', 'multiple'] })
  @Column()
  type: 'single' | 'multiple';

  @ApiProperty({ description: 'Whether the sub-question is required', default: false })
  @Column({ default: false })
  required: boolean;

  @ManyToOne(() => Question, question => question.questionModels)
   @ApiProperty({ description: 'ParentQuestion Id' })
   parentQuestionId:string
  parentQuestion: Question;

  @OneToMany(() => Option, option => option.question, {
    cascade: true,
    eager: true,
  })
  options: Option[];
}
