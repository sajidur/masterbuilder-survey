/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
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
  itemId?: string;

@ManyToOne(() => Item, (item) => item.subItems, { nullable: true })
item: Item;


  @OneToMany(() => SubSubItem, (subSubItem) => subSubItem.subItem)
  subSubItems: SubSubItem[];
    

}
