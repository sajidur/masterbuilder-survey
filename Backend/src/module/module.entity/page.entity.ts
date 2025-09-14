/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {  Item } from './item.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  tier: string;
  @Column()
  itemId?: string;
  @Column()
  userId: string;
  @Column()
  serialNumber: string;
  @Column()
  Entry?: boolean
  @Column()
  View?: boolean;
  @Column({ nullable: true })
  Settings?: boolean;
  @Column()
  BreakPoint: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
}
