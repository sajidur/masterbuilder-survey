/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ErpModule {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 255 })
  @ApiProperty({ description: 'Name of the module' })
  module: string;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Associated application name' })
  app: string;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Name of the menu under which this module appears' })
  menu: string;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Feature name associated with the module' })
  feature: string;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Sub-feature name associated with the module' })
  sub_feature: string;

  @Column('text')
  @ApiProperty({ description: 'Field details in text format' })
  field: string;

  @Column('text', { nullable: true })
  @ApiProperty({ description: 'Additional remarks or notes about the module', required: false })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  @ApiProperty({ description: 'Date and time when the module was created' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @ApiProperty({ description: 'Date and time when the module was last updated' })
  updated_at: Date;
}
