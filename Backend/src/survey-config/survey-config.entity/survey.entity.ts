/* eslint-disable prettier/prettier */
 
 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionGroup } from './questionGroup.entity';


@Entity('survey-configs')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => QuestionGroup, qg => qg.survey, { cascade: true, eager: true })
  questionGroups: QuestionGroup[];
}
