/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { QuestionGroup } from './questionGroup.entity';
import { Option } from './option.entity';
import { QuestionModel } from './question-model.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Question text' })
  @Column()
  text: string;

  @ApiProperty({ description: 'Type of the question', enum: ['single', 'multiple'] })
  @Column()
  type: 'single' | 'multiple';

  @ApiProperty({ description: 'Whether the question is required or not', default: false })
  @Column({ default: false })
  required: boolean;

   @ApiProperty({ description: 'questionGroupId' })
   questionGroupId:string
  @ManyToOne(() => QuestionGroup, questionGroup => questionGroup.questions)
  questionGroup: QuestionGroup;

  @OneToMany(() => Option, option => option.question, {
    cascade: true,
    eager: true,
  })
  options: Option[];

  @OneToMany(() => QuestionModel, sub => sub.parentQuestion, {
    cascade: true,
    eager: true,
  })
  questionModels: QuestionModel[];
}
