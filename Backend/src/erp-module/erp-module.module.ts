/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErpModule } from './erp.entity/erp-module.entity';
import { ErpModuleService } from './erp-module.service';
import { ErpModuleController } from './erp-module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ErpModule])],
  providers: [ErpModuleService],
  controllers: [ErpModuleController],
})
export class ErpModuleModule {}


