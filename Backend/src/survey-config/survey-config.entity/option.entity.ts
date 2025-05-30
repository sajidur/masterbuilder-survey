/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Text of the option' })
  @Column()
  text: string;

  @ApiProperty({ description: 'Value associated with the option' })
  @Column()
  value: string;

  @ApiProperty({ description: 'Related question, if the option belongs directly to a question', required: false })
  questionId?:string
  @ManyToOne(() => Question, question => question.options, { nullable: true })
  question?: Question;

  @ApiProperty({ description: 'Related question model, if the option belongs to a sub-question or question model', required: false })
  questionModelId?:string
  @ManyToOne(() => QuestionModel, questionModel => questionModel.options, { nullable: true })
  questionModel?: QuestionModel;
}
