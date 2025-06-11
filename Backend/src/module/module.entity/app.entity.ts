/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// app.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Modules } from './modules.entity';
import { Menu } from './menu.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class App {
   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
 @ApiProperty({ description: 'Name of the app' })
  name: string;

 @Column()
 @ApiProperty({ description: 'Module ID' })
  moduleId: string;
  @ManyToOne(() => Modules, (module) => module.apps)
  module: Modules;

  @OneToMany(() => Menu, (menu) => menu.app)
  menus: Menu[];
}
