/* eslint-disable prettier/prettier */
// module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { App } from './app.entity'
import { ApiProperty } from '@nestjs/swagger'


@Entity()
export class Modules  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the module' })
  name: string

  @OneToMany(() => App, (app) => app.module)
  apps: App[]
  
}
