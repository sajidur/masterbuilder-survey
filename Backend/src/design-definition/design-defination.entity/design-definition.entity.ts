// src/design-definition/entities/design-definition.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubSubItem } from '../../module/module.entity/subsubitem.entity'; // adjust path as needed

@Entity()
export class DesignDefinition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.designDefinitions, { onDelete: 'CASCADE' })
  subSubItem: SubSubItem;

  @Column()
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @Column()
  title: string;

  @Column('jsonb')
  content: any;

  @Column({ nullable: true })
  notes?: string;
}
