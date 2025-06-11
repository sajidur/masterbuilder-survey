/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ description: 'User ID who answered' })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ description: 'Optional text response' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Selected option IDs (comma-separated UUIDs)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  selectedOptionIds?: string[];

  @ApiPropertyOptional({ description: 'ID of the main question being answered' })
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @ApiPropertyOptional({ description: 'ID of the sub-question (question model) being answered' })
  @IsOptional()
  @IsUUID()
  questionModelId?: string;
}
export class UpdateAnswerDto {
  @ApiPropertyOptional({ description: 'User ID who answered' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ description: 'Optional text response' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Selected option IDs (array of UUIDs)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  selectedOptionIds?: string[];

  @ApiPropertyOptional({ description: 'ID of the main question being answered' })
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @ApiPropertyOptional({ description: 'ID of the sub-question (question model) being answered' })
  @IsOptional()
  @IsUUID()
  questionModelId?: string;
}
