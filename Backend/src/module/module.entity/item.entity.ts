/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Menu } from './menu.entity';
import { SubItem } from './subitem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
 @ApiProperty({ description: 'Name of the item' })
  name: string;
  @Column()
  @ApiProperty({ description: 'Menu ID' })
  menuId: string;
  @ManyToOne(() => Menu, (menu) => menu.items)
  menu: Menu;

  @OneToMany(() => SubItem, (subItem) => subItem.item)
  subItems: SubItem[];
}
