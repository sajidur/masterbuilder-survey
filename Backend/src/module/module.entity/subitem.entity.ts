/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Item } from './item.entity';
import { Field } from './field.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubItem } from './subsubitem.entity';

@Entity()
export class SubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  tier: string;
  @Column()
  itemId?: string;

  @ManyToOne(() => Item, (item) => item.subItems, { nullable: true })
  item: Item;

  @OneToMany(() => SubSubItem, (subSubItem) => subSubItem.subItem)
  subSubItems: SubSubItem[];
  @Column()
  templateId: string;
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
}
