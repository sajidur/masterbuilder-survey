/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SubItem } from './subitem.entity';
import { Field } from './field.entity';
//import { ApiProperty } from '@nestjs/swagger';
//import { SubSubItemAnswer } from 'src/survey-config/survey-config.entity/subSubItemAnswer.entity';

@Entity()
export class SubSubItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  
  @Column()
  subItemId?: number;

@ManyToOne(() => SubItem, (subItem) => subItem.subSubItems, { nullable: true })
subItem: SubItem;

  @OneToMany(() => Field, (field) => field.subSubItem)
  fields: Field[];
  //@OneToMany(() => SubSubItemAnswer, (ssa) => ssa.subSubItem)
  //subSubItemAnswers: SubSubItemAnswer[];
}
