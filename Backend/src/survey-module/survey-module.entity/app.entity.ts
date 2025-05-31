/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// app.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import { Modules } from './modules.entity'
import { Menu } from '../survey-module.entity/menu.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @ApiProperty({ description: 'Name of the app' })
  name: string;

  @ApiProperty({ description: 'Module ID' })
  moduleId: number;
  @ManyToOne(() => Modules, (module) => module.apps)
  module: Modules

  @OneToMany(() => Menu, (menu) => menu.app)
  menus: Menu[]

}
