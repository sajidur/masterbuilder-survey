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
import { SubItem } from './subitem.entity';
import { Field } from './field.entity';
//import { DesignDefinition } from 'src/design-definition/design-defination.entity/design-definition.entity';
//import { ApiProperty } from '@nestjs/swagger';
//import { SubSubItemAnswer } from 'src/survey-config/survey-config.entity/subSubItemAnswer.entity';

@Entity()
export class SubSubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subItemId?: string;
  @Column()
  tier: string;
  @ManyToOne(() => SubItem, (subItem) => subItem.subSubItems, {
    nullable: true,
  })
  subItem: SubItem;
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
    subSubSubItems: any;
  // ✅ One-to-Many relation with DesignDefinition
  // @OneToMany(() => DesignDefinition, (definition) => definition.subSubItem)
  // designDefinitions: DesignDefinition[];
  //@OneToMany(() => SubSubItemAnswer, (ssa) => ssa.subSubItem)
  //subSubItemAnswers: SubSubItemAnswer[];
}
