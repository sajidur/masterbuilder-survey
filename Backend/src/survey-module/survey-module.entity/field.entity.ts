/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubItem } from '../survey-module.entity/subitem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the field' })
  name: string;

  @ApiProperty({ description: 'Type of the field' })
  type: string;

  @ApiProperty({ description: 'SubItem ID' })
  subItemId: number;

  @ManyToOne(() => SubItem, (subItem) => subItem.fields)
  subItem: SubItem;
}
