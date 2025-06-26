/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from './field.entity';
import { SubSubItem } from './subsubitem.entity';
//import { DesignDefinition } from 'src/design-definition/design-defination.entity/design-definition.entity';
//import { ApiProperty } from '@nestjs/swagger';
//import { SubSubItemAnswer } from 'src/survey-config/survey-config.entity/subSubItemAnswer.entity';

@Entity()
export class SubSubSubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subSubItemId?: string;
  @Column()
  tier: string;
  @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.subSubSubItems, {
    nullable: true,
  })
  subSubItem: SubSubItem;
  @Column()
  templateId: string;
  @OneToMany(() => Field, (field) => field.subSubSubItem)
  fields: Field[];

  @Column()
  userId: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
  // ✅ One-to-Many relation with DesignDefinition
  // @OneToMany(() => DesignDefinition, (definition) => definition.subSubItem)
  // designDefinitions: DesignDefinition[];
  //@OneToMany(() => SubSubItemAnswer, (ssa) => ssa.subSubItem)
  //subSubItemAnswers: SubSubItemAnswer[];
}