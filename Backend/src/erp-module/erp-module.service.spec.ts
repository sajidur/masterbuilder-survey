/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ErpModuleService } from './erp-module.service';

describe('ErpModuleService', () => {
  let service: ErpModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErpModuleService],
    }).compile();

    service = module.get<ErpModuleService>(ErpModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
