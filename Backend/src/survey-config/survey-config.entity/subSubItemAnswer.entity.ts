/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { SubSubItem } from "src/survey-module/survey-module.entity/subsubitem.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity()
export class SubSubItemAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.subSubItemAnswers, { onDelete: 'CASCADE' })
  subSubItem: SubSubItem;

  @ManyToOne(() => Answer, (answer) => answer.subSubItemAnswers, { onDelete: 'CASCADE' })
  answer: Answer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // You can add extra metadata here if needed
  // @Column({ nullable: true })
  // status: string;
}
