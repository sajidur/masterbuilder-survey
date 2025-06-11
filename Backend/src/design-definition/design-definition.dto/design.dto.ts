/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';

export class CreateDesignDefinitionDto {
  @ApiProperty({
    description: 'ID of the related SubSubItem',
    example: 42,
  })
  @IsNumber()
  @IsNotEmpty()
  subSubItemId: number;

  @ApiProperty({
    description: 'Type of the design definition',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
    example: 'CLASS',
  })
  @IsEnum(['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'])
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @ApiProperty({
    description: 'Title of the design',
    example: 'User Authentication Flow',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Design content in JSON format',
    example: { nodes: [], edges: [] },
  })
  @IsObject()
  @IsNotEmpty()
  content: any;

  @ApiPropertyOptional({
    description: 'Public URL of the uploaded image or photo',
    example: 'https://cdn.example.com/images/design123.png',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Additional notes or comments for the design',
    example: 'Initial draft version for review',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
export class DesignDefinitionResponseDto {
  id:number;
  subSubItem: SubSubItem|null;
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';
  title: string;
  content: any;
  imageUrl?: string;
  notes?: string;
}