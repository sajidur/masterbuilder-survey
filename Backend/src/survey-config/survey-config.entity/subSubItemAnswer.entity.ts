/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
//import { SubSubItem } from "src/survey-module/survey-module.entity/subsubitem.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
//import { Answer } from "./answer.entity";

@Entity()
export class SubSubItemAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 // @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.subSubItemAnswers, { onDelete: 'CASCADE' })
  subSubItemId: string;

  //@ManyToOne(() => Answer, (answer) => answer.subSubItemAnswers, { onDelete: 'CASCADE' })
  answerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // You can add extra metadata here if needed
  // @Column({ nullable: true })
  // status: string;
}
