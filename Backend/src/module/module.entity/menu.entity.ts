/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Item } from './item.entity';
import { App } from './app.entity';
@Entity()
export class Menu {
   @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;

  @Column()
  appId: string;
  @ManyToOne(() => App, (app) => app.menus)
  app: App;
  @OneToMany(() => Item, (item) => item.menu)
  items: Item[];
   
}
