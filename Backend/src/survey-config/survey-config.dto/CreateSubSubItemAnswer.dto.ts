/* eslint-disable prettier/prettier */
import { IsUUID, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Answer } from '../survey-config.entity/answer.entity';

export class CreateSubSubItemAnswerDto {
  @ApiProperty({ description: 'ID of the SubSubItem', example: 1 })
  @IsInt()
  subSubItemId: number;

  @ApiProperty({ description: 'ID of the Answer', example: 'a1b2c3d4-5678-9101-1121-314151617181' })
  @IsUUID()
  answerId: string;

  // Optional metadata if used
  // @ApiProperty({ description: 'Optional status', required: false })
  // @IsOptional()
  // @IsString()
  // status?: string;
}
export class SubSubItemAnswerResponseDto {
  
  id: number;
  subSubItem: SubSubItem;
  answer: Answer;
  createdAt: Date;
  updatedAt: Date;
}
