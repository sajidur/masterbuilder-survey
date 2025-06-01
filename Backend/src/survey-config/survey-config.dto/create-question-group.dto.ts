/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

// create-question-group.dto.ts

export class CreateQuestionGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}