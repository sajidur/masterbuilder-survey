/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubSubItem } from '../../module/module.entity/subsubitem.entity';

@Entity('DesignDefinitions')
export class DesignDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' }) // Correct type for MySQL
  contentTypeId: string;

  @Column({ type: 'varchar' })
  contentTypeName: string;

  @Column({ type: 'varchar' })
  fileType: string;

  @Column({
    type: 'enum',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
  })
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'json' }) // MySQL supports JSON
  content: any;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
