/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Item } from '../survey-module.entity/item.entity';
import { App } from '../survey-module.entity/app.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty({ description: 'Title of the menu' })
  title: string;

 @ApiProperty({ description: 'App ID' })
  appId: number;
  @ManyToOne(() => App, (app) => app.menus)
  app: App;
  @OneToMany(() => Item, (item) => item.menu)
  items: Item[];
   
   
}
