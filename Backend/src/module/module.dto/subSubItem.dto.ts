/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { SubItemDto } from "./subiItem.dto";

export class SubSubItemDto {
  id: string;
  name: string;
  subItemId?: string;   
  subItem?: SubItemDto | null;
  
}
export class CreateSubSubItemDto {
  @ApiProperty({ description: 'Label of the subsubitem' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'SubItem ID' })
  @IsString()
  @IsOptional()
  subItemId?: string;
}
