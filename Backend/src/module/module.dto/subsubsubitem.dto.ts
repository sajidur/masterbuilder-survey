/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubSubItemDto } from './subSubItem.dto';
import { Template } from 'src/Template/entity/template';

export class CreateSubSubSubItemDto {
  @ApiProperty({
    description: 'Name of the SubSubSubItem',
    example: 'Line Item 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tier of the SubSubSubItem', example: 'Level 4' })
  @IsString()
  @IsNotEmpty()
  tier: string;

  @ApiProperty({
    description: 'Template ID associated with the item',
    example: 'uuid-template-123',
  })
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({
    description: 'User ID of the creator',
    example: 'user-uuid-456',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'ID of the parent SubSubItem',
    example: 'uuid-subsubitem-789',
  })
  @IsOptional()
  @IsString()
  subSubItemId?: string;

  @ApiPropertyOptional({ description: 'Created By (user name or ID)' })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({ description: 'Updated By (user name or ID)' })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
export class SubSubSubItemDto {
  id: string;
  name: string;
  tier: string;
  templateId: string;
  userId: string;
  subSubItemId?: string;
  subSubItem?: SubSubItemDto | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  template?: Template | null;
}
