/* eslint-disable prettier/prettier */
 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubSubItem } from './subSubSubItem.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the field' })
  name: string;

  @Column()
  @ApiProperty({ description: 'SubSubSubItem ID' })
  subSubSubItemId: string;

  @ManyToOne(() => SubSubSubItem, (subSubSubItem) => subSubSubItem.fields)
  subSubSubItem: SubSubSubItem;
  @Column()
  userId: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
  @Column()
  fieldGroup:string;
    @Column()
  fieldType:string;
    @Column()
  isRequired:boolean;
    
}
