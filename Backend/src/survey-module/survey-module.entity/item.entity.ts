/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Menu } from '../survey-module.entity/menu.entity';
import { SubItem } from '../survey-module.entity/subitem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 @ApiProperty({ description: 'Name of the item' })
  name: string;
  @Column()
  @ApiProperty({ description: 'Menu ID' })
  menuId: number;
  @ManyToOne(() => Menu, (menu) => menu.items)
  menu: Menu;

  @OneToMany(() => SubItem, (subItem) => subItem.item)
  subItems: SubItem[];
}
