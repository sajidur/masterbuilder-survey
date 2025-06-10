/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubSubItem } from '../../module/module.entity/subsubitem.entity';

@Entity("DesignDefinitions")
export class DesignDefinition {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.designDefinitions, {
  //   onDelete: 'CASCADE',
  // })


   @Column({ type: 'int' })
  subSubItemId: number;

  @Column({
    type: 'enum',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
  })
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @Column()
  title: string;

  @Column({ type: 'json' }) // For MySQL, use 'json' instead of 'jsonb' which is PostgreSQL only
  content: any;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  notes?: string;
}
