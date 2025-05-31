/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubItem } from './subsubitem.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the field' })
  name: string;

  @ApiProperty({ description: 'SubItem ID' })
  subSubItemId: number;

  @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.fields)
  subSubItem: SubSubItem;

}
