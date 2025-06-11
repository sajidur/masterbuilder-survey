/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubSubItem } from '../../module/module.entity/subsubitem.entity';

@Entity('DesignDefinitions')
export class DesignDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Correct type for MySQL
  contentTypeId: string;

  @Column()
  contentTypeName: string;

  @Column()
  fileType: string;

  @Column({
    type: 'enum',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
  })
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @Column()
  title: string;

  @Column({ type: 'json' }) // MySQL supports JSON
  content: any;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({  nullable: true })
  notes?: string;
}
