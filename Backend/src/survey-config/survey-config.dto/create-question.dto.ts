/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsArray, ValidateNested } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";
import { CreateQuestionModelDto } from "./create-question-model.dto";

// create-question.dto.ts
export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(['single', 'multiple'])
  type: 'single' | 'multiple';

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionModelDto)
  questionModels?: CreateQuestionModelDto[];
}