/* eslint-disable prettier/prettier */
 
// === survey.dto.ts ===
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionGroupDto } from './create-question-group.dto';
import { Type } from 'class-transformer';
export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionGroupDto)
  questionGroups: CreateQuestionGroupDto[];
}

export class UpdateSurveyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}