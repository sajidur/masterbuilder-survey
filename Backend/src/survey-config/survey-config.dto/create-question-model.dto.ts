/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsArray, ValidateNested } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";

// create-question-model.dto.ts
export class CreateQuestionModelDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(['single', 'multiple'])
  type: 'single' | 'multiple';

  @IsBoolean()
  required: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}
