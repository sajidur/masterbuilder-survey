/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Item } from '../survey-module.entity/item.entity';
import { App } from '../survey-module.entity/app.entity';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;

  @Column()
  appId: number;
  @ManyToOne(() => App, (app) => app.menus)
  app: App;
  @OneToMany(() => Item, (item) => item.menu)
  items: Item[];
   
}
