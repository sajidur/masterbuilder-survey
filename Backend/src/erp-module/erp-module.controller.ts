/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErpModuleService } from './erp-module.service';
import { ErpModule } from './erp.entity/erp-module.entity';

@ApiTags('erp-modules')
@Controller('erp-modules')
export class ErpModuleController {
  constructor(private readonly erpModuleService: ErpModuleService) {}

  @Get('allErpModules')
  @ApiResponse({ status: 200, type: [ErpModule] })
  findAll(): Promise<ErpModule[]> {
    return this.erpModuleService.findAll();
  }

  @Get('getErpModule:id')
  @ApiResponse({ status: 200, type: ErpModule })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ErpModule> {
    const module = await this.erpModuleService.findOne(id);
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  @Post('addErpModule')
  @ApiBody({ type: ErpModule })
  @ApiResponse({ status: 201, type: ErpModule })
  create(@Body() module: ErpModule): Promise<ErpModule> {
    return this.erpModuleService.create(module);
  }

  @Put('updateErpModule:id')
  @ApiBody({ type: ErpModule })
  @ApiResponse({ status: 200, type: ErpModule })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() module: ErpModule,
  ): Promise<ErpModule> {
    return this.erpModuleService.update(id, module);
  }

  @Delete('deleteErpModule:id')
  @ApiResponse({ status: 204, description: 'Module deleted' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.erpModuleService.delete(id);
  }
}
