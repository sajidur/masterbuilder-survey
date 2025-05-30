/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SubItem } from '../survey-module.entity/subitem.entity';
import { Field } from '../survey-module.entity/field.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SubSubItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Label of the subsubitem' })
  label: string;

  @ApiProperty({ description: 'SubItem ID', required: false })
  subItemId?: number;

@ManyToOne(() => SubItem, (subItem) => subItem.subSubItems, { nullable: true })
subItem: SubItem;

  @OneToMany(() => Field, (field) => field.subSubItem)
  fields: Field[];

}
