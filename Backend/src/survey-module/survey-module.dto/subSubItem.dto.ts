/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { SubItemDto } from "../survey-module.dto/subiItem.dto";

export class SubSubItemDto {
  id: number;
  label: string;
  subItemId?: number;   
  subItem?: SubItemDto | null;
  
}
export class CreateSubSubItemDto {
  @ApiProperty({ description: 'Label of the subsubitem' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ description: 'SubItem ID' })
  @IsNumber()
  @IsOptional()
  subItemId?: number;
}
