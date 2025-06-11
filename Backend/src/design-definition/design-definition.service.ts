/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
//import { Field } from 'multer';
import { App } from 'src/module/module.entity/app.entity';
import { Field } from 'src/module/module.entity/field.entity';
import { Item } from 'src/module/module.entity/item.entity';
import { Menu } from 'src/module/module.entity/menu.entity';
import { Modules } from 'src/module/module.entity/modules.entity';
import { SubItem } from 'src/module/module.entity/subitem.entity';
//import { App } from 'supertest/types';

@Injectable()
export class DesignDefinitionService {
 constructor(
    @InjectRepository(DesignDefinition)
    private readonly designDefRepo: Repository<DesignDefinition>,
  //  @InjectRepository(Modules) private readonly modulesRepository: Repository<Modules>,
  //   @InjectRepository(App) private readonly appRepository: Repository<App>,
  //   @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  //   @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  //   @InjectRepository(SubItem) private readonly subItemRepository: Repository<SubItem>,
  //   @InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
  //   @InjectRepository(SubSubItem) private readonly subSubItemRepository: Repository<SubSubItem>,
  ) {} 
//   async create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto> {
//   const subSubItem = await this.subSubItemRepo.findOne({
//     where: { id: dto.subSubItemId },
//   });

//   if (!subSubItem) {
//     throw new NotFoundException('SubSubItem not found');
//   }

//   const designDefinition = this.designDefRepo.create({
//     type: dto.type,
//     title: dto.title,
//     content: dto.content,
//     imageUrl: dto.imageUrl,
//     notes: dto.notes,
//     subSubItem, // Establish relation directly
//   });

//   const saved = await this.designDefRepo.save(designDefinition);

//   return {
//     id: saved.id,
//     type: saved.type,
//     title: saved.title,
//     content: saved.content,
//     imageUrl: saved.imageUrl,
//     notes: saved.notes,
//     subSubItem: subSubItem,
//   };
// }

//  async findAll(): Promise<DesignDefinitionResponseDto[]> {
//   const data = await this.designDefRepo.find();

//   return Promise.all(
//     data.map(async (designDef) => {
//       const subSubItem = await this.subSubItemRepo.findOne({
//         where: { id: designDef.subSubItemId },
//       });

//       return {
//         id: designDef.id,
//         title: designDef.title,
//         type: designDef.type,
//         content: designDef.content,
//         imageUrl: designDef.imageUrl,
//         notes: designDef.notes,
//         subSubItem:subSubItem, // full object manually loaded
//       };
//     }),
//   );
// }


//   async findOne(id: string): Promise<DesignDefinitionResponseDto> {
//     const designDef = await this.designDefRepo.findOne({
//       where: { id },
//       relations: ['subSubItem'],
//     });
//     if (!designDef) {
//       throw new NotFoundException(`DesignDefinition with ID ${id} not found`);
//     }
//     const subSubItem = await this.subSubItemRepo.findOne({
//       where: { id: designDef.subSubItemId },
//     });

//     if (!subSubItem) {
//       throw new NotFoundException('SubSubItem not found');
//     }
//   return {
//       id: designDef.id,
//       title: designDef.title,
//       type: designDef.type,
//       content: designDef.content,
//       imageUrl: designDef.imageUrl,
//       notes: designDef.notes,
    
//     };
//   }

//   async update(
//     id: string,
//     dto: Partial<CreateDesignDefinitionDto>,
//   ): Promise<DesignDefinitionResponseDto> {
//     const designDef = await this.designDefRepo.findOne({
//       where: { id }
//     });

//     if (!designDef) {
//       throw new NotFoundException('DesignDefinition not found');
//     }
//    const subSubItem = await this.subSubItemRepo.findOne({
//       where: { id: designDef.subSubItemId },
//     });

//     if (!subSubItem) {
//       throw new NotFoundException('SubSubItem not found');
//     }
//     designDef.subSubItemId = subSubItem.id;
    

//     Object.assign(designDef, dto);
//     const updated = await this.designDefRepo.save(designDef);

//     return {
//       id: updated.id,
//       title: updated.title,
//       type: updated.type,
//       content: updated.content,
//       imageUrl: updated.imageUrl,
//       notes: updated.notes,
//       subSubItem: subSubItem
//     };
//   }

//   async remove(id: string): Promise<void> {
//     const designDef = await this.designDefRepo.findOne({
//       where: { id }
//     });
//     if(designDef){
//     await this.designDefRepo.remove(designDef);
//     }
//   }


}
