/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';

@Injectable()
export class DesignDefinitionService {
 constructor(
    @InjectRepository(DesignDefinition)
    private readonly designDefRepo: Repository<DesignDefinition>,
    @InjectRepository(SubSubItem)
    private readonly subSubItemRepo: Repository<SubSubItem>,
  ) {} async create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto> {
    const subSubItem = await this.subSubItemRepo.findOne({
      where: { id: dto.subSubItemId },
    });

    if (!subSubItem) {
      throw new NotFoundException('SubSubItem not found');
    }

    const designDef = this.designDefRepo.create({
      ...dto,
      subSubItemId:subSubItem.id,
    });

    const savedDesign = await this.designDefRepo.save(designDef);

    return {
      id: savedDesign.id,
      title: savedDesign.title,
      type: savedDesign.type,
      content: savedDesign.content,
      imageUrl: savedDesign.imageUrl,
      notes: savedDesign.notes,
      subSubItem: subSubItem,
    };
  }

 async findAll(): Promise<DesignDefinitionResponseDto[]> {
  const data = await this.designDefRepo.find();

  return Promise.all(
    data.map(async (designDef) => {
      const subSubItem = await this.subSubItemRepo.findOne({
        where: { id: designDef.subSubItemId },
      });

      return {
        id: designDef.id,
        title: designDef.title,
        type: designDef.type,
        content: designDef.content,
        imageUrl: designDef.imageUrl,
        notes: designDef.notes,
        subSubItem:subSubItem, // full object manually loaded
      };
    }),
  );
}


  async findOne(id: number): Promise<DesignDefinitionResponseDto> {
    const designDef = await this.designDefRepo.findOne({
      where: { id },
      relations: ['subSubItem'],
    });
    if (!designDef) {
      throw new NotFoundException(`DesignDefinition with ID ${id} not found`);
    }
    const subSubItem = await this.subSubItemRepo.findOne({
      where: { id: designDef.subSubItemId },
    });

    if (!subSubItem) {
      throw new NotFoundException('SubSubItem not found');
    }
  return {
      id: designDef.id,
      title: designDef.title,
      type: designDef.type,
      content: designDef.content,
      imageUrl: designDef.imageUrl,
      notes: designDef.notes,
      subSubItem: subSubItem,
    };
  }

  async update(
    id: number,
    dto: Partial<CreateDesignDefinitionDto>,
  ): Promise<DesignDefinitionResponseDto> {
    const designDef = await this.designDefRepo.findOne({
      where: { id }
    });

    if (!designDef) {
      throw new NotFoundException('DesignDefinition not found');
    }
   const subSubItem = await this.subSubItemRepo.findOne({
      where: { id: designDef.subSubItemId },
    });

    if (!subSubItem) {
      throw new NotFoundException('SubSubItem not found');
    }
    designDef.subSubItemId = subSubItem.id;
    

    Object.assign(designDef, dto);
    const updated = await this.designDefRepo.save(designDef);

    return {
      id: updated.id,
      title: updated.title,
      type: updated.type,
      content: updated.content,
      imageUrl: updated.imageUrl,
      notes: updated.notes,
      subSubItem: subSubItem
    };
  }

  async remove(id: number): Promise<void> {
    const designDef = await this.designDefRepo.findOne({
      where: { id }
    });
    if(designDef){
    await this.designDefRepo.remove(designDef);
    }
  }


}
