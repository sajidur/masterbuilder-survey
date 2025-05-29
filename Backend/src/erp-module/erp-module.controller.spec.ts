/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ErpModuleController } from './erp-module.controller';

describe('ErpModuleController', () => {
  let controller: ErpModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErpModuleController],
    }).compile();

    controller = module.get<ErpModuleController>(ErpModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
