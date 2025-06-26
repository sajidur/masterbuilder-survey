/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto} from '../Template/dtos/template.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() dto: CreateTemplateDto) {
    return this.templateService.create(dto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateTemplateDto) {
    return this.templateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
