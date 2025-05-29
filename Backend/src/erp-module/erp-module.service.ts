/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErpModule } from './erp.entity/erp-module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ErpModuleService {
  constructor(
    @InjectRepository(ErpModule) private readonly erpRepo: Repository<ErpModule>,
  ) {}

  async findAll(): Promise<ErpModule[]> {
    return this.erpRepo.find();
  }

  async findOne(id: number): Promise<ErpModule | null> {
    return this.erpRepo.findOne({ where: { id } });
  }

  async create(module: ErpModule): Promise<ErpModule> {
    return this.erpRepo.save(module);
  }

  async update(id: number, updated: ErpModule): Promise<ErpModule> {
    const existing = await this.erpRepo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    const merged = this.erpRepo.merge(existing, updated);
    return this.erpRepo.save(merged);
  }

  async delete(id: number): Promise<void> {
    const result = await this.erpRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
  }
}
