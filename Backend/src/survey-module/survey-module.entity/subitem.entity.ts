/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Item } from '../survey-module.entity/item.entity';
import { Field } from '../survey-module.entity/field.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubItem } from './subsubitem.entity';

@Entity()
export class SubItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  
  @Column()
  itemId?: number;

@ManyToOne(() => Item, (item) => item.subItems, { nullable: true })
item: Item;


  @OneToMany(() => SubSubItem, (subSubItem) => subSubItem.subItem)
  subSubItems: SubSubItem[];
    

}
