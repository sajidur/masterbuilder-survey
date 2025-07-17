/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */

/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Modules } from './module.entity/modules.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './module.entity/app.entity';
import { Menu } from './module.entity/menu.entity';
import { Item } from './module.entity/item.entity';
import { SubItem } from './module.entity/subitem.entity';
import { Field } from './module.entity/field.entity';
import { SubSubItem } from './module.entity/subsubitem.entity';
import { AppDto, CreateAppDto, UpdateAppDto } from './module.dto/App.dto';
import { CreateMenuDto, MenuDto } from './module.dto/menu.dto';
import { CreateItemDto, ItemDto } from './module.dto/item.dto';
import { CreateSubItemDto, SubItemDto } from './module.dto/subiItem.dto';
import {
  CreateSubSubItemDto,
  SubSubItemDto,
} from './module.dto/subSubItem.dto';
import {  CreateFieldDto, FieldDto } from './module.dto/field.dto';
import { Module } from '@nestjs/core/injector/module';
import {
  CreateModuleDto,
  ModuleDto,
  UpdateModuleDto,
} from './module.dto/create-module.dto';
import { User } from 'src/user/user.entity/user.entity';
import { SubSubSubItem } from './module.entity/subSubSubItem.entity';
import {
  CreateSubSubSubItemDto,
  SubSubSubItemDto,
} from './module.dto/subsubsubitem.dto';
import { Template } from 'src/Template/entity/template';
import { memoryUsage } from 'process';
import { escapeId } from 'mysql2';
import { DataPoint } from './module.entity/dataPoint.entity';
import { AllDataPointDto, CreateDataPointDto, DataPointDto } from './module.dto/dataPoint.dto';
import { plainToInstance } from 'class-transformer';
import { TotalCount } from './module.dto/totalCount.dto';
@Injectable()
export class SurveyModuleService {
  dataSource: any;
  constructor(
    @InjectRepository(Modules)
    private readonly modulesRepository: Repository<Modules>,
    @InjectRepository(App) private readonly appRepository: Repository<App>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(SubItem)
    private readonly subItemRepository: Repository<SubItem>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(SubSubItem)
    private readonly subSubItemRepository: Repository<SubSubItem>,
    @InjectRepository(SubSubSubItem)
    private readonly subSubSubItemRepo: Repository<SubSubSubItem>,
    @InjectRepository(Template)
    private readonly TemplateRepo: Repository<Template>,
    @InjectRepository(DataPoint)
    private readonly dataPointRepo: Repository<DataPoint>,
  ) {}
  //subsubitem
  async toSubSubItemDto(subSubItem: SubSubItem): Promise<SubSubItemDto> {
    let subItemDto: SubItemDto | null = null;
    const subItem = await this.subItemRepository.findOne({
      where: { id: subSubItem.subItemId },
    });
    if (!subItem) {
      throw new NotFoundException(
        `SubItem with ID ${subSubItem.subItemId} not found`,
      );
    }
    let template: Template | null = null;

    if (subSubItem.templateId) {
      template = await this.TemplateRepo.findOne({
        where: { id: subSubItem.templateId },
      });
    }
    return {
      id: subSubItem.id,
      name: subSubItem.name,
      tier: subSubItem.tier,
      layout: subSubItem.layout,
      buttonType: subSubItem.buttonType,
      buttonLabel: subSubItem.buttonLabel,
      navigationTo: subSubItem.navigationTo,
      serialNumber: subSubItem.serialNumber,
      subItemId: subSubItem?.subItemId,
      subItem: await this.toSubItemDto(subItem),
      templateText: subSubItem.templateText || null,
      template: template || null,
    };
  }

  //  async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  //   const items = await this.subSubItemRepository.find();
  //   return Promise.all(items.map(item => this.toSubSubItemDto(item)));
  // }
  private async toSubSubItemDto1(
    subSubItem: SubSubItem,
    subItemDtoMap: Map<string, SubItemDto>,
  ): Promise<SubSubItemDto> {
    if (!subSubItem.subItemId) {
      throw new BadRequestException('SubSubItem must have a valid subItemId');
    }

    const subItemDto = subItemDtoMap.get(subSubItem.subItemId);
    if (!subItemDto) {
      throw new NotFoundException(
        `SubItem with ID ${subSubItem.subItemId} not found in cache`,
      );
    }
    let template: Template | null = null;

    if (subSubItem.templateId) {
      template = await this.TemplateRepo.findOne({
        where: { id: subSubItem.templateId },
      });
    }

    return {
      id: subSubItem.id,
      name: subSubItem.name,
      tier: subSubItem.tier,
      serialNumber: subSubItem.serialNumber,
      layout: subSubItem.layout,
      buttonType: subSubItem.buttonType,
      buttonLabel: subSubItem.buttonLabel,
      navigationTo: subSubItem.navigationTo,
      subItemId: subSubItem.subItemId,
      subItem: subItemDto,
      templateText: subSubItem.templateText || null,
      template: template || null,
    };
  }

  // async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  //   const [subSubItems, subItems, items, menus, apps, modules] =
  //     await Promise.all([
  //       this.subSubItemRepository.find({
  //         order: {
  //           serialNumber: 'ASC',
  //         },
  //       }),
  //       this.subItemRepository.find(),
  //       this.itemRepository.find(),
  //       this.menuRepository.find(),
  //       this.appRepository.find(),
  //       this.modulesRepository.find(),
  //     ]);

  //   if (!subSubItems.length) {
  //     console.log('No sub-sub-items found.');
  //     return [];
  //   }

  //   // Build maps for quick lookup
  //   const appMap = new Map(apps.map((app) => [app.id, app]));
  //   const moduleMap = new Map(modules.map((mod) => [mod.id, mod]));

  //   const menuDtoMap = new Map<string, MenuDto>();
  //   for (const menu of menus) {
  //     const app = appMap.get(menu.appId);
  //     const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

  //     const moduleDto: ModuleDto | null = module
  //       ? {
  //           id: module.id,
  //           name: module.name,
  //           tier: module.tier,
  //           serialNumber: module.serialNumber,
  //         }
  //       : null;

  //     const appDto: AppDto | null = app
  //       ? {
  //           id: app.id,
  //           name: app.name,
  //           tier: app.tier,
  //           serialNumber: app.serialNumber,
  //           Module: moduleDto,
  //         }
  //       : null;

  //     menuDtoMap.set(menu.id, {
  //       id: menu.id,
  //       title: menu.title,
  //       tier: menu.tier,
  //       serialNumber: menu.serialNumber,
  //       app: appDto,
  //     });
  //   }

  //   const itemDtoMap = new Map<string, ItemDto>();
  //   for (const item of items) {
  //     const menuDto = menuDtoMap.get(item.menuId);
  //     if (!menuDto) continue;

  //     itemDtoMap.set(item.id, {
  //       id: item.id,
  //       name: item.name,
  //       tier: item.tier,
  //       serialNumber: item.serialNumber,
  //       buttonType: item.buttonType,
  //       buttonLabel: item.buttonLabel,
  //       navigationTo: item.navigationTo,
  //       description: item.description,
  //       menu: menuDto,
  //     });
  //   }

  //   const subItemDtoMap = new Map<string, SubItemDto>();
  //   for (const subItem of subItems) {
  //     if (!subItem.itemId) {
  //       console.warn(`SubItem ${subItem.id} has no itemId.`);
  //       continue;
  //     }

  //     const itemDto = itemDtoMap.get(subItem.itemId);
  //     if (!itemDto) {
  //       console.warn(
  //         `Item with ID ${subItem.itemId} not found for SubItem ${subItem.id}`,
  //       );
  //       continue;
  //     }

  //     subItemDtoMap.set(subItem.id, {
  //       id: subItem.id,
  //       name: subItem.name,
  //       tier: subItem.tier,
  //       serialNumber: subItem.serialNumber,
  //       buttonType: subItem.buttonType,
  //       layout: subItem.layout,
  //       buttonLabel: subItem.buttonLabel,
  //       navigationTo: subItem.navigationTo,
  //       description: subItem.description,
  //       itemId: subItem.itemId,
  //       item: itemDto,
  //     });
  //   }

  //   return Promise.all(
  //     subSubItems.map((subSubItem) =>
  //       this.toSubSubItemDto1(subSubItem, subItemDtoMap),
  //     ),
  //   );
  // }
async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  const [subSubItems, subItems, items, menus, apps, modules] =
    await Promise.all([
      this.subSubItemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.subItemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.itemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.menuRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.appRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.modulesRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
    ]);

  if (!subSubItems.length) {
    console.log('No sub-sub-items found.');
    return [];
  }

  // Build maps for quick lookup
  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? {
          id: module.id,
          name: module.name,
          tier: module.tier,
          serialNumber: module.serialNumber,
        }
      : null;

    const appDto: AppDto | null = app
      ? {
          id: app.id,
          name: app.name,
          tier: app.tier,
          serialNumber: app.serialNumber,
          Module: moduleDto,
        }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
      tier: menu.tier,
      serialNumber: menu.serialNumber,
      app: appDto,
    });
  }

  const itemDtoMap = new Map<string, ItemDto>();
  for (const item of items) {
    const menuDto = menuDtoMap.get(item.menuId);
    if (!menuDto) continue;

    itemDtoMap.set(item.id, {
      id: item.id,
      name: item.name,
      tier: item.tier,
      serialNumber: item.serialNumber,
      buttonType: item.buttonType,
      buttonLabel: item.buttonLabel,
      navigationTo: item.navigationTo,
      description: item.description,
      menu: menuDto,
    });
  }

  const subItemDtoMap = new Map<string, SubItemDto>();
  for (const subItem of subItems) {
    if (!subItem.itemId) {
      console.warn(`SubItem ${subItem.id} has no itemId.`);
      continue;
    }

    const itemDto = itemDtoMap.get(subItem.itemId);
    if (!itemDto) {
      console.warn(
        `Item with ID ${subItem.itemId} not found for SubItem ${subItem.id}`,
      );
      continue;
    }

    subItemDtoMap.set(subItem.id, {
      id: subItem.id,
      name: subItem.name,
      tier: subItem.tier,
      serialNumber: subItem.serialNumber,
      buttonType: subItem.buttonType,
      layout: subItem.layout,
      buttonLabel: subItem.buttonLabel,
      navigationTo: subItem.navigationTo,
      description: subItem.description,
      itemId: subItem.itemId,
      item: itemDto,
    });
  }

  // subSubItems is already sorted by serialNumber, no need to sort again
  return Promise.all(
    subSubItems.map((subSubItem) =>
      this.toSubSubItemDto1(subSubItem, subItemDtoMap),
    ),
  );
}

  async findOneSubSubItem(id: string): Promise<SubSubItemDto> {
    const item = await this.subSubItemRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`SubSubItem with ID ${id} not found`);
    }
    return this.toSubSubItemDto(item);
  }

  async createSubSubItem(
    data: CreateSubSubItemDto,
    user: User,
  ): Promise<SubSubItemDto> {
    var subSubItem = new SubSubItem();
    subSubItem.name = data.name;
    subSubItem.subItemId = data.subItemId;
    subSubItem.createdAt = new Date();
    subSubItem.updatedAt = new Date();
    subSubItem.createdBy = user.username;
    subSubItem.updatedBy = user.username;
    subSubItem.userId = user.id;
    subSubItem.tier = data.tier;
    subSubItem.buttonType = data.buttonType;
    subSubItem.buttonLabel = data.buttonLabel;
    subSubItem.navigationTo = data.navigationTo;
    subSubItem.layout = data.layout;
    subSubItem.serialNumber = data.serialNumber;
    subSubItem.templateId = data.templateId ?? subSubItem.templateId;
    subSubItem.templateText = data.templateText ?? subSubItem.templateText;

    const saved = await this.subSubItemRepository.save(subSubItem);
    return this.toSubSubItemDto(saved);
  }

  async updateSubSubItem(
    id: string,
    data: CreateSubSubItemDto,
    user: User,
  ): Promise<SubSubItemDto> {
    const existing = await this.subSubItemRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`SubSubItem with ID ${id} not found`);
    }
    existing.name = data.name;
    existing.subItemId = data.subItemId;
    existing.updatedAt = new Date();
    existing.updatedBy = user.username;
    existing.tier = data.tier;
    existing.serialNumber = data.serialNumber;
    existing.buttonLabel = data.buttonLabel;
    existing.buttonType = data.buttonType;
    existing.navigationTo = data.navigationTo;
    existing.layout = data.layout;
    existing.templateId = data.templateId ?? existing.templateId;
    existing.templateText = data.templateText ?? existing.templateText;
    var updatedData = await this.subSubItemRepository.save(existing);
    return this.toSubSubItemDto(updatedData);
  }

  async deleteSubSubItem(
    subSubItemId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if SubSubItem exists
    const subSubItem = await this.subSubItemRepository.findOne({
      where: { id: subSubItemId },
    });
    if (!subSubItem) {
      return {
        status: 'error',
        message: `SubSubItem with ID ${subSubItemId} not found.`,
      };
    }

    try {
      // 2. Get all SubSubSubItems under this SubSubItem
      const subSubSubItems = await this.subSubSubItemRepo.find({
        where: { subSubItemId },
      });

      for (const subSubSubItem of subSubSubItems) {
        const fields = await this.fieldRepository.find({
          where: { subSubSubItemId: subSubSubItem.id },
        });

        if (fields.length > 0) {
          await this.fieldRepository.remove(fields);
        }

        await this.subSubSubItemRepo.remove(subSubSubItem);
      }

      // 3. Remove the SubSubItem itself
      await this.subSubItemRepository.remove(subSubItem);

      return {
        status: 'success',
        message: 'SubSubItem and related data deleted successfully.',
      };
    } catch (error) {
      console.error('SubSubItem deletion failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete SubSubItem and related data.',
      };
    }
  }

  //field
  // async toFieldDto(field: Field): Promise<FieldDto> {
  //   const subSubItem1 = await this.subSubItemRepository.findOneBy({
  //     id: field.subSubSubItemId,
  //   });
  //   if (!subSubItem1) {
  //     throw new NotFoundException(
  //       `SubSubItem with ID ${field.subSubSubItemId} not found`,
  //     );
  //   }
  //   return {
  //     id: field.id,
  //     name: field.name,
  //     subSubSubItemId: field.subSubSubItemId,
  //     subSubSubItem: await this.toSubSubItemDto(subSubItem1),
  //   };
  // }
async toFieldDto1(
  field: Field
): Promise<FieldDto> {
 const item: Item | null = await this.itemRepository.findOne({ where: { id: field.itemId } });

if (!item) {
  throw new NotFoundException(`Item with ID ${field.itemId} not found`);
}

  const subItem = field.subItemId
    ? await this.subItemRepository.findOne({ where: { id: field.subItemId } })
    : null;
  const subSubItem = field.subSubItemId
    ? await this.subSubItemRepository.findOne({ where: { id: field.subSubItemId } })
    : null;

  const subSubSubItem = field.subSubSubItemId
    ? await this.subSubSubItemRepo.findOne({ where: { id: field.subSubSubItemId } })
    : null;

  return {
    id: field.id,
    remarks: field.remarks,
    fieldGroupCode: field.fieldGroupCode,
    tier: field.tier,
    displayType: field.displayType,
    serialNumber: field.serialNumber,
    Item: item ? await this.toItemDto(item):null,
    subItem: subItem ,
    subSubItem: subSubItem ,
    subSubSubItem: subSubSubItem,
  };
}

  async findAllFields(): Promise<FieldDto[]> {
    const fields = await this.fieldRepository.find({
      order: {
        serialNumber: 'ASC',
      },
    });

    if (!fields.length) return [];

    // const subSuSubItemIds = Array.from(
    //   new Set(fields.map((f) => f.subSubSubItemId)),
    // );
    // const subSubSubItems =
    //   await this.subSubSubItemRepo.findByIds(subSuSubItemIds);
    // const subSubSubItemMap = new Map(
    //   subSubSubItems.map((sub) => [sub.id, sub]),
    // );
    return Promise.all(
      fields.map((field) => this.toFieldDto1(field)),
    );
  }

async findAllFieldsWithDataPoints(user:User): Promise<AllDataPointDto[]> {
 const fields = await this.fieldRepository.find({
  order: { serialNumber: 'ASC' },
});


  if (!fields.length) return [];

  const dataPoints = await this.dataPointRepo.find({
    order: { serialNumber: 'ASC' },
  });

  // Group DataPoints by dpGroupCode (which maps to Field.id)
  const dpGroupMap = new Map<string, DataPoint[]>();
  for (const dp of dataPoints) {
    if (!dpGroupMap.has(dp.dpGroupCode)) {
      dpGroupMap.set(dp.dpGroupCode, []);
    }
    dpGroupMap.get(dp.dpGroupCode)!.push(dp);
  }

  const result: AllDataPointDto[] = await Promise.all(
    fields.map(async (field) => {
      const item = field.itemId ? await this.itemRepository.findOne({ where: { id: field.itemId } }) : null;
      const subItem = field.subItemId ? await this.subItemRepository.findOne({ where: { id: field.subItemId } }) : null;
      const subSubItem = field.subSubItemId ? await this.subSubItemRepository.findOne({ where: { id: field.subSubItemId } }) : null;
      const subSubSubItem = field.subSubSubItemId ? await this.subSubSubItemRepo.findOne({ where: { id: field.subSubSubItemId } }) : null;

      const dataPointsForField = dpGroupMap.get(field.id) || [];

      return {
        id: field.id,
        serialNumber: field.serialNumber,
        displayType: field.displayType,
        remarks: field.remarks,
        tier: field.tier,
        fieldGroupCode: field.fieldGroupCode,
        Item: item ? await this.toItemDto(item) : null,
        subItem,
        subSubItem,
        subSubSubItem,
        dataPoints: await Promise.all(dataPointsForField.map((dp) => this.toDataPointDto(dp))),
      };
    })
  );

  return result;
}



  //   async findAllFields(): Promise<FieldDto[]> {
  //   const fields = await this.fieldRepository.find();
  //   return Promise.all(fields.map((field) => this.toFieldDto(field)));
  // }

  // async findOneField(id: string): Promise<FieldDto | null> {
  //   const field = await this.fieldRepository.findOne({
  //     where: { id }
  //   });

  //   return field ? this.toFieldDto(field) : null;
  // }

  // async createField(field: CreateFieldDto): Promise<FieldDto> {
  //   var newField=new Field();
  //   newField.name=field.name;
  //   newField.subSubItemId=field.subSubItemId;
  //   const data = await this.fieldRepository.save(newField);
  //   return await this.toFieldDto(data);
  // }

  // async updateField(id: string, updated: CreateFieldDto): Promise<FieldDto> {
  //   const existing = await this.fieldRepository.findOneBy({ id });
  //   if (!existing) {
  //     throw new NotFoundException(`Field with ID ${id} not found`);
  //   }

  //  existing.name=updated.name;
  //  existing.subSubItemId=updated.subSubItemId;
  //   const saved = await this.fieldRepository.save(existing);
  //   return await this.toFieldDto(saved);
  // }

  async findOneField(id: string): Promise<FieldDto | null> {
    const field = await this.fieldRepository.findOne({ where: { id } });
    if (!field) return null;

    // const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
    //   id: field.subSubSubItemId,
    // });
    // if (!subSubSubItem) {
    //   throw new NotFoundException(
    //     `SubSubItem with ID ${field.subSubSubItemId} not found`,
    //   );
    // }

    return await this.toFieldDto1(field);
  }
  async createField(field: CreateFieldDto, user: User): Promise<FieldDto> {
    const newField = new Field();
    newField.remarks = field.remarks;
    newField.subSubSubItemId = field.subSubSubItemId;
    newField.subItemId=field.subItemId,
    newField.subSubItemId=field.subSubItemId,
    newField.itemId=field.itemId,
    newField.updatedAt = new Date();
    newField.updatedBy = user.username;
    newField.createdAt = new Date();
    newField.createdBy = user.username;
    newField.userId = user.id;
    newField.serialNumber = field.serialNumber;
    newField.displayType = field.displayType;
    newField.tier = field.tier;
    newField.fieldGroupCode = field.fieldGroupCode;
    const saved = await this.fieldRepository.save(newField);

    // const subSubItem = await this.subSubSubItemRepo.findOneBy({
    //   id: saved.subSubSubItemId,
    // });
    // if (!subSubItem) {
    //   throw new NotFoundException(
    //     `SubSubItem with ID ${saved.subSubSubItemId} not found`,
    //   );
    // }

     return await this.toFieldDto1(saved);
  }
  async updateField(
    id: string,
    updated: CreateFieldDto,
    user: User,
  ): Promise<FieldDto> {
    const existing = await this.fieldRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
   existing.itemId=updated.itemId,
   existing.subItemId=updated.subItemId,
   existing.subSubItemId=updated.subSubItemId,
   
    existing.remarks = updated.remarks;
    existing.subSubSubItemId = updated.subSubSubItemId;
    existing.updatedAt = new Date();
    existing.updatedBy = user.username;
    existing.displayType = updated.displayType;
    existing.serialNumber = updated.serialNumber;

    existing.tier = updated.tier;
    existing.userId = user.id;
    existing.fieldGroupCode = updated.fieldGroupCode;

    const saved = await this.fieldRepository.save(existing);

    // const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
    //   id: saved.subSubSubItemId,
    // });
    // if (!subSubSubItem) {
    //   throw new NotFoundException(
    //     `SubSubSubItem with ID ${saved.subSubSubItemId} not found`,
    //   );
    // }

    // return {
    //   id: saved.id,
    //   remarks: saved.remarks,
    //   fieldGroupCode: saved.fieldGroupCode,
    //   tier: saved.tier,
    //   displayType: saved.displayType,
    //   serialNumber: saved.serialNumber,
    //   subSubSubItemId: saved.subSubSubItemId,
    //   subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
    // };
    return await this.toFieldDto1(saved);
  }

  async deleteField(
    fieldId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if field exists
    const field = await this.fieldRepository.findOne({
      where: { id: fieldId },
    });
    if (!field) {
      return {
        status: 'error',
        message: `Field with ID ${fieldId} not found.`,
      };
    }

    try {
      const dataPoints=await this.dataPointRepo.find({
              where: { dpGroupCode: field.id },
            });
            for (const data of dataPoints) {
                await this.dataPointRepo.remove(data);
              }
      // 2. Remove the field
      await this.fieldRepository.remove(field);

      return { status: 'success', message: 'Field deleted successfully.' };
    } catch (error) {
      console.error('Field deletion failed:', error);
      return { status: 'error', message: 'Failed to delete field.' };
    }
  }

  //subitem
  //    async findAllSubItems(): Promise<SubItem[]> {
  //   return this.subItemRepository.find();
  // }
  private async toSubItemDto1(
    subItem: SubItem,
    itemDtoMap: Map<string, ItemDto>,
  ): Promise<SubItemDto> {
    if (!subItem) {
      throw new NotFoundException('SubItem not found');
    }

    const itemId = subItem.itemId;

    if (!itemId) {
      throw new BadRequestException('SubItem must have a valid itemId');
    }

    const itemDto = itemDtoMap.get(itemId);

    if (!itemDto) {
      throw new NotFoundException(`Item with ID ${itemId} not found in cache`);
    }
    let template: Template | null = null;

    if (subItem.templateId) {
      template = await this.TemplateRepo.findOne({
        where: { id: subItem.templateId },
      });
    }

    return {
      id: subItem.id,
      name: subItem.name,
      tier: subItem.tier,
      serialNumber: subItem.serialNumber,
      buttonType: subItem.buttonType,
      buttonLabel: subItem.buttonLabel,
      layout: subItem.layout,
      navigationTo: subItem.navigationTo,
      description: subItem.description,
      itemId,
      item: itemDto,
      templateText: subItem.templateText || null,
      template: template || null,
    };
  }

  async findAllSubItems(): Promise<SubItemDto[]> {
    const [subItems, items, menus, apps, modules] = await Promise.all([
      this.subItemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.itemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.menuRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.appRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.modulesRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
    ]);

    if (!subItems.length) {
      console.log('No sub-items found.');
      return [];
    }

    const appMap = new Map(apps.map((app) => [app.id, app]));
    const moduleMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appMap.get(menu.appId);
      const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }

    const itemDtoMap = new Map<string, ItemDto>();
    for (const item of items) {
      const menuDto = menuDtoMap.get(item.menuId);
      if (!menuDto) continue;

      itemDtoMap.set(item.id, {
        id: item.id,
        name: item.name,
        tier: item.tier,
        serialNumber: item.serialNumber,
        buttonType: item.buttonType,
        buttonLabel: item.buttonLabel,
        navigationTo: item.navigationTo,
        description: item.description,
        menu: menuDto,
      });
    }

    return Promise.all(
      subItems.map((subItem) => this.toSubItemDto1(subItem, itemDtoMap)),
    );
  }

  async findOneSubItem(id: string): Promise<SubItemDto> {
    if (!id) {
      throw new BadRequestException('SubItem ID must be provided');
    }

    // Load the subItem by id
    const subItem = await this.subItemRepository.findOne({ where: { id } });
    if (!subItem) {
      throw new NotFoundException(`SubItem with ID ${id} not found`);
    }

    // Fetch all related data in parallel for mapping
    const [items, menus, apps, modules] = await Promise.all([
      this.itemRepository.find(),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    // Build maps for quick lookup
    const appMap = new Map(apps.map((app) => [app.id, app]));
    const moduleMap = new Map(modules.map((m) => [m.id, m]));

    // Construct menuDtoMap
    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appMap.get(menu.appId);
      const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }

    // Construct itemDtoMap
    const itemDtoMap = new Map<string, ItemDto>();
    for (const item of items) {
      const menuDto = menuDtoMap.get(item.menuId);
      if (!menuDto) continue;

      itemDtoMap.set(item.id, {
        id: item.id,
        name: item.name,
        tier: item.tier,
        serialNumber: item.serialNumber,
        buttonType: item.buttonType,
        buttonLabel: item.buttonLabel,
        navigationTo: item.navigationTo,
        description: item.description,
        menu: menuDto,
      });
    }

    // Use cached itemDtoMap to build SubItemDto
    return this.toSubItemDto1(subItem, itemDtoMap);
  }

  // async findOneSubItem(id: string): Promise<SubItem | null> {
  //   return this.subItemRepository.findOne({ where: { id } });
  // }

  async createSubItem(
    subItem: CreateSubItemDto,
    user: User,
  ): Promise<SubItemDto> {
    var newSubItem = new SubItem();
    newSubItem.name = subItem.name;
    newSubItem.itemId = subItem.itemId;
    newSubItem.createdAt = new Date();
    newSubItem.createdBy = user.username;
    newSubItem.updatedAt = new Date();
    newSubItem.updatedBy = user.username;
    newSubItem.userId = user.id;
    newSubItem.templateId = subItem.templateId ?? newSubItem.templateId;
    newSubItem.templateText = subItem.templateText ?? newSubItem.templateText;
    newSubItem.tier = subItem.tier;
    newSubItem.serialNumber = subItem.serialNumber;
    newSubItem.buttonType = subItem.buttonType;
    newSubItem.buttonLabel = subItem.buttonLabel;
    newSubItem.navigationTo = subItem.navigationTo;
    newSubItem.layout = subItem.layout;
    newSubItem.description = subItem.description;
    var data = this.subItemRepository.save(newSubItem);
    // Fetch all related data in parallel for mapping
    const [items, menus, apps, modules] = await Promise.all([
      this.itemRepository.find(),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    // Build maps for quick lookup
    const appMap = new Map(apps.map((app) => [app.id, app]));
    const moduleMap = new Map(modules.map((m) => [m.id, m]));

    // Construct menuDtoMap
    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appMap.get(menu.appId);
      const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }

    // Construct itemDtoMap
    const itemDtoMap = new Map<string, ItemDto>();
    for (const item of items) {
      const menuDto = menuDtoMap.get(item.menuId);
      if (!menuDto) continue;

      itemDtoMap.set(item.id, {
        id: item.id,
        name: item.name,
        tier: item.tier,
        serialNumber: item.serialNumber,
        buttonType: item.buttonType,
        buttonLabel: item.buttonLabel,
        navigationTo: item.navigationTo,
        description: item.description,
        menu: menuDto,
      });
    }

    // Use cached itemDtoMap to build SubItemDto
    return this.toSubItemDto1(await data, itemDtoMap);
  }

  async updateSubItem(
    id: string,
    updated: CreateSubItemDto,
    user: User,
  ): Promise<SubItemDto> {
    const existing = await this.subItemRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`SubItem with ID ${id} not found`);
    }
    existing.name = updated.name;
    existing.itemId = updated.itemId;
    existing.updatedAt = new Date();
    existing.updatedBy = user.username;
    existing.tier = updated.tier;
    existing.templateId = updated.templateId ?? existing.templateId;
    existing.templateText = updated.templateText ?? existing.templateText;
    existing.serialNumber = updated.serialNumber;
    existing.buttonType = updated.buttonType;
    existing.buttonLabel = updated.buttonLabel;
    existing.navigationTo = updated.navigationTo;
    existing.description = updated.description;
    existing.layout = updated.layout;
    const data = this.subItemRepository.save(existing);
    // Fetch all related data in parallel for mapping
    const [items, menus, apps, modules] = await Promise.all([
      this.itemRepository.find(),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    // Build maps for quick lookup
    const appMap = new Map(apps.map((app) => [app.id, app]));
    const moduleMap = new Map(modules.map((m) => [m.id, m]));

    // Construct menuDtoMap
    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appMap.get(menu.appId);
      const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }

    // Construct itemDtoMap
    const itemDtoMap = new Map<string, ItemDto>();
    for (const item of items) {
      const menuDto = menuDtoMap.get(item.menuId);
      if (!menuDto) continue;

      itemDtoMap.set(item.id, {
        id: item.id,
        name: item.name,
        tier: item.tier,
        serialNumber: item.serialNumber,
        buttonType: item.buttonType,
        buttonLabel: item.buttonLabel,
        navigationTo: item.navigationTo,
        description: item.description,
        menu: menuDto,
      });
    }

    // Use cached itemDtoMap to build SubItemDto
    return this.toSubItemDto1(await data, itemDtoMap);
  }

  // Helper to convert SubItem -> SubItemDto

  async toSubItemDto(subItem: SubItem): Promise<SubItemDto> {
    let itemDto: ItemDto | null = null;

    const itemId = subItem?.itemId;

    if (itemId === undefined || itemId == null) {
      throw new BadRequestException('SubItem must have a valid itemId');
    }

    const item = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    itemDto = await this.toItemDto(item);
    let template: Template | null = null;

    if (subItem.templateId) {
      template = await this.TemplateRepo.findOne({
        where: { id: subItem.templateId },
      });
    }

    return {
      id: subItem.id,
      name: subItem.name,
      tier: subItem.tier,
      serialNumber: subItem.serialNumber,
      buttonType: subItem.buttonType,
      buttonLabel: subItem.buttonLabel,
      layout: subItem.layout,
      navigationTo: subItem.navigationTo,
      description: subItem.description,
      itemId: itemId, // Now guaranteed to be number
      item: itemDto,
      templateText: subItem.templateText || null,
      template: template || null,
    };
  }

  async deleteSubItem(
    subItemId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if subItem exists
    const subItem = await this.subItemRepository.findOne({
      where: { id: subItemId },
    });
    if (!subItem) {
      return {
        status: 'error',
        message: `SubItem with ID ${subItemId} not found.`,
      };
    }

    try {
      // 2. Get all subSubItems under this subItem
      const subSubItems = await this.subSubItemRepository.find({
        where: { subItemId },
      });

      for (const subSubItem of subSubItems) {
        const subSubSubItems = await this.subSubSubItemRepo.find({
          where: { subSubItemId: subSubItem.id },
        });

        for (const subSubSubItem of subSubSubItems) {
          const fields = await this.fieldRepository.find({
            where: { subSubSubItemId: subSubSubItem.id },
          });

          if (fields.length > 0) {
            await this.fieldRepository.remove(fields);
          }

          await this.subSubSubItemRepo.remove(subSubSubItem);
        }

        await this.subSubItemRepository.remove(subSubItem);
      }

      // 3. Remove the subItem
      await this.subItemRepository.remove(subItem);

      return {
        status: 'success',
        message: 'SubItem and related data deleted successfully.',
      };
    } catch (error) {
      console.error('SubItem deletion failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete subItem and related data.',
      };
    }
  }

  //item
  private async toItemDto(item: Item): Promise<ItemDto> {
    const menu = await this.menuRepository.findOne({
      where: { id: item.menuId },
    });
    console.log('menu title ' + menu?.title);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${item.menuId} not found`);
    }

    return {
      id: item.id,
      name: item.name,
      tier: item.tier,
      serialNumber: item.serialNumber,
      buttonType: item.buttonType,
      buttonLabel: item.buttonLabel,
      navigationTo: item.navigationTo,
      description: item.description,
      menu: await this.toMenuDto(menu),
    };
  }

  // async findAllItems(): Promise<ItemDto[]> {
  //   const items = await this.itemRepository.find();
  //   return Promise.all(items.map(item => this.toItemDto(item)));
  // }
  private async toItemDto1(
    item: Item,
    menuDtoMap: Map<string, MenuDto>,
  ): Promise<ItemDto> {
    const menuDto = menuDtoMap.get(item.menuId);

    if (!menuDto) {
      throw new NotFoundException(`Menu with ID ${item.menuId} not found`);
    }

    return {
      id: item.id,
      name: item.name,
      tier: item.tier,
      serialNumber: item.serialNumber,
      buttonType: item.buttonType,
      buttonLabel: item.buttonLabel,
      navigationTo: item.navigationTo,
      description: item.description,
      menu: menuDto,
    };
  }

  async findAllItems(): Promise<ItemDto[]> {
    const [items, menus, apps, modules] = await Promise.all([
      this.itemRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.menuRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.appRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.modulesRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
    ]);

    if (!items.length) {
      console.log('No items found.');
      return [];
    }

    const appsMap = new Map(apps.map((app) => [app.id, app]));
    const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();

    for (const menu of menus) {
      const app = appsMap.get(menu.appId);
      const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }

    return Promise.all(items.map((item) => this.toItemDto1(item, menuDtoMap)));
  }

  async findOneItem(id: string): Promise<ItemDto | null> {
    const [item, menus, apps, modules] = await Promise.all([
      this.itemRepository.findOne({ where: { id } }),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    if (!item) {
      console.log('No items found.');
      return null;
    }
    const appsMap = new Map(apps.map((app) => [app.id, app]));
    const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appsMap.get(menu.appId);
      const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }
    return this.toItemDto1(item, menuDtoMap);
  }

  async createItem(item: CreateItemDto, user: User): Promise<ItemDto> {
    var newItem = new Item();
    newItem.name = item.name;
    newItem.menuId = item.menuId;
    newItem.tier = item.tier;
    newItem.createdAt = new Date();
    newItem.createdBy = user.username;
    newItem.updatedAt = new Date();
    newItem.updatedBy = user.username;
    newItem.userId = user.id;
    newItem.serialNumber = item.serialNumber;
    newItem.buttonType = item.buttonType;
    newItem.navigationTo = item.navigationTo;
    newItem.description = item.description;
    newItem.buttonLabel = item.buttonLabel;
    const created = await this.itemRepository.save(newItem);
    const [menus, apps, modules] = await Promise.all([
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);
    const appsMap = new Map(apps.map((app) => [app.id, app]));
    const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appsMap.get(menu.appId);
      const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }
    return this.toItemDto1(created, menuDtoMap);
    // return this.toItemDto(created);
  }

  async updateItem(
    id: string,
    updatedItem: CreateItemDto,
    user: User,
  ): Promise<ItemDto> {
    const [item, menus, apps, modules] = await Promise.all([
      this.itemRepository.findOne({ where: { id } }),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    if (!item) {
      console.log('No items found.');
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    item.menuId = updatedItem.menuId;
    item.name = updatedItem.name;
    item.updatedAt = new Date();
    item.updatedBy = user.username;
    item.serialNumber = updatedItem.serialNumber;
    item.buttonType = updatedItem.buttonType;
    item.navigationTo = updatedItem.navigationTo;
    item.description = updatedItem.description;
    item.tier = updatedItem.tier;
    const saved = await this.itemRepository.save(item);
    const appsMap = new Map(apps.map((app) => [app.id, app]));
    const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appsMap.get(menu.appId);
      const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
      const moduleDto: ModuleDto | null = module
        ? {
            id: module.id,
            name: module.name,
            tier: module.tier,
            serialNumber: module.serialNumber,
          }
        : null;

      const appDto: AppDto | null = app
        ? {
            id: app.id,
            name: app.name,
            tier: app.tier,
            serialNumber: app.serialNumber,
            Module: moduleDto,
          }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber: menu.serialNumber,
        app: appDto,
      });
    }
    return this.toItemDto1(saved, menuDtoMap);

    //console.log(saved.name);
    //  return this.toItemDto(saved);
  }

  async deleteItem(
    itemId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if item exists
    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      return { status: 'error', message: `Item with ID ${itemId} not found.` };
    }

    try {
       const dataPoints=await this.dataPointRepo.find({
              where: { itemId: item.id },
            });
            for (const data of dataPoints) {
                await this.dataPointRepo.remove(data);
              }
      // 2. Get all subItems under the item
      const subItems = await this.subItemRepository.find({ where: { itemId } });

      for (const subItem of subItems) {
        const subSubItems = await this.subSubItemRepository.find({
          where: { subItemId: subItem.id },
        });

        for (const subSubItem of subSubItems) {
          const subSubSubItems = await this.subSubSubItemRepo.find({
            where: { subSubItemId: subSubItem.id },
          });

          for (const subSubSubItem of subSubSubItems) {
            const fields = await this.fieldRepository.find({
              where: { subSubSubItemId: subSubSubItem.id },
            });

            if (fields.length) {
              await this.fieldRepository.remove(fields);
            }

            await this.subSubSubItemRepo.remove(subSubSubItem);
          }

          await this.subSubItemRepository.remove(subSubItem);
        }

        await this.subItemRepository.remove(subItem);
      }

      // 3. Delete the item itself
      await this.itemRepository.remove(item);

      return {
        status: 'success',
        message: 'Item and related data deleted successfully.',
      };
    } catch (error) {
      console.error('Item delete failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete item and related data.',
      };
    }
  }

  //modules
  findAll(): Promise<Modules[]> {
    // return this.modulesRepository.find();
    return this.modulesRepository.find({
      order: {
        serialNumber: 'ASC', // use 'DESC' for descending order
      },
    });
  }

  async findOne(id: string): Promise<Modules> {
    const user = await this.modulesRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  async update(id: string, dto: UpdateModuleDto, user: User): Promise<Modules> {
    const existingModule = await this.modulesRepository.findOneBy({ id });

    if (!existingModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    const now = new Date();
    const userId = user.id;
    const updatedModule = this.modulesRepository.merge(existingModule, {
      ...dto,
      updatedAt: now,
      updatedBy: user.username, // retain existing if not provided
      tier: dto.tier,
      serialNumber: dto.serialNumber,
      name: dto.name,
    });

    return this.modulesRepository.save(updatedModule);
  }

  async create(dto: CreateModuleDto, user: User): Promise<Modules> {
    const userId = user.id;
    const module = this.modulesRepository.create({
      name: dto.name,
      tier: dto.tier,
      userId: userId,
      createdAt: new Date(),
      createdBy: user.username,
      serialNumber: dto.serialNumber,
      updatedAt: new Date(),
      updatedBy: user.username,
    });

    return this.modulesRepository.save(module);
  }

  // async remove(id: string): Promise<void> {
  //   //before removing get all apps related to moduleId==id,
  //   //items related to appId so son upto field:

  //   await this.modulesRepository.delete(id);
  // }
  async remove(moduleId: string): Promise<{ status: string; message: string }> {
    // 1. Check if module exists
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
    });
    if (!module) {
      return { status: 'error', message: 'No such module found.' };
    }

    try {
      // 2. Get all apps under the module
      const apps = await this.appRepository.find({ where: { moduleId } });

      for (const app of apps) {
        const menus = await this.menuRepository.find({
          where: { appId: app.id },
        });

        for (const menu of menus) {
          const items = await this.itemRepository.find({
            where: { menuId: menu.id },
          });

          for (const item of items) {
            const subItems = await this.subItemRepository.find({
              where: { itemId: item.id },
            });
            const dataPoints=await this.dataPointRepo.find({
              where: { itemId: item.id },
            });
            for (const data of dataPoints) {
                await this.dataPointRepo.remove(data);
              }

            for (const subItem of subItems) {
              const subSubItems = await this.subSubItemRepository.find({
                where: { subItemId: subItem.id },
              });

              for (const subSubItem of subSubItems) {
                const subSubSubItems = await this.subSubSubItemRepo.find({
                  where: { subSubItemId: subSubItem.id },
                });

                for (const subSubSubItem of subSubSubItems) {
                  const fields = await this.fieldRepository.find({
                    where: { subSubSubItemId: subSubSubItem.id },
                  });
                  if (fields.length) {
                    await this.fieldRepository.remove(fields);
                  }
                  await this.subSubSubItemRepo.remove(subSubSubItem);
                }

                await this.subSubItemRepository.remove(subSubItem);
              }

              await this.subItemRepository.remove(subItem);
            }

            await this.itemRepository.remove(item);
          }

          await this.menuRepository.remove(menu);
        }

        await this.appRepository.remove(app);
      }

      // 3. Delete the module itself
      await this.modulesRepository.remove(module);

      return {
        status: 'success',
        message: 'Module and related data deleted successfully.',
      };
    } catch (error) {
      console.error('Delete failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete module and related data.',
      };
    }
  }

  // ---------- APP METHODS ----------
  //    private async toDto(app: App): Promise<AppDto> {
  //   const modules=await this.modulesRepository.find();
  //   const module = await this.modulesRepository.findOne({
  //     where: { id: app.moduleId },
  //   });

  //   if (!module) {
  //     throw new Error(`Module with ID ${app.moduleId} not found`);
  //   }

  //   return {
  //     id: app.id,
  //     name: app.name,
  //     Module: module,
  //   };
  // }

  private async toDto(
    app: App,
    modulesMap: Map<String, Modules>,
  ): Promise<AppDto | null> {
    const module = modulesMap.get(app.moduleId);

    if (!module) {
      // throw new NotFoundException(`Module with ID ${app.moduleId} not found`);
      return null;
    }

    return {
      id: app.id,
      name: app.name,
      tier: app.tier,
      serialNumber: app.serialNumber,
      Module: module,
    };
  }

  async findAllApps(): Promise<AppDto[]> {
    const [apps, modules] = await Promise.all([
      this.appRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.modulesRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
    ]);
// Build a Map of Module ID => Module
  const modulesMap = new Map<string, Modules>(
    modules.map((module) => [module.id, module]),
  );

  // Convert to DTOs and filter out any nulls (in case a module is missing)
  const appDtos = (
    await Promise.all(apps.map((app) => this.toDto(app, modulesMap)))
  ).filter((dto): dto is AppDto => dto !== null);

  // Sort by Module.serialNumber, then App.serialNumber
  appDtos.sort((a, b) => {
  const moduleA = a.Module!.serialNumber;
  const moduleB = b.Module!.serialNumber;

  const moduleCompare = moduleA.localeCompare(moduleB);
  if (moduleCompare !== 0) return moduleCompare;

  return a.serialNumber.localeCompare(b.serialNumber);
});

  return appDtos;
  }

  async findOneApp(id: string): Promise<AppDto | null> {
    const [app, modules] = await Promise.all([
      this.appRepository.findOne({ where: { id } }),
      this.modulesRepository.find(),
    ]);

    if (!app) throw new NotFoundException(`App with ID ${id} not found`);

    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    return this.toDto(app, modulesMap);
  }

  async createApp(
    createAppDto: CreateAppDto,
    user: User,
  ): Promise<AppDto | null> {
    const [modules] = await Promise.all([this.modulesRepository.find()]);
    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    const module = modulesMap.get(createAppDto.moduleId);
    console.log(module);
    if (!module) {
      throw new NotFoundException(
        `Module with ID ${createAppDto.moduleId} not found`,
      );
    }

    const app = this.appRepository.create({
      name: createAppDto.name,
      
      moduleId: createAppDto.moduleId,
      tier: createAppDto.tier??null,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      serialNumber: createAppDto.serialNumber,
      createdBy: user.username,
      updatedBy: user.username,
    });

    const created = await this.appRepository.save(app);
    return this.toDto(created, modulesMap);
  }

  async updateApp(
    id: string,
    app: UpdateAppDto,
    user: User,
  ): Promise<AppDto | null> {
    const [modules] = await Promise.all([this.modulesRepository.find()]);
    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    const module = modulesMap.get(app.moduleId);
    console.log(module);
    if (!module) {
      throw new NotFoundException(`Module with ID ${app.moduleId} not found`);
    }
    const existing = await this.appRepository.preload({
      id,
      updatedAt: new Date(),
      updatedBy: user.username,
      ...app,
    });

    if (!existing) {
      throw new NotFoundException(`App with ID ${id} not found`);
    }

    const updated = await this.appRepository.save(existing);
    return this.toDto(updated, modulesMap);
  }

  async deleteApp(appId: string): Promise<{ status: string; message: string }> {
    // 1. Check if app exists
    const app = await this.appRepository.findOne({ where: { id: appId } });
    if (!app) {
      return { status: 'error', message: 'No such app found.' };
    }

    try {
      // 2. Get all menus under the app
      const menus = await this.menuRepository.find({ where: { appId } });

      for (const menu of menus) {
        const items = await this.itemRepository.find({
          where: { menuId: menu.id },
        });

        for (const item of items) {
          const subItems = await this.subItemRepository.find({
            where: { itemId: item.id },
          });
           const dataPoints=await this.dataPointRepo.find({
              where: { itemId: item.id },
            });
            for (const data of dataPoints) {
                await this.dataPointRepo.remove(data);
              }
          for (const subItem of subItems) {
            const subSubItems = await this.subSubItemRepository.find({
              where: { subItemId: subItem.id },
            });

            for (const subSubItem of subSubItems) {
              const subSubSubItems = await this.subSubSubItemRepo.find({
                where: { subSubItemId: subSubItem.id },
              });

              for (const subSubSubItem of subSubSubItems) {
                const fields = await this.fieldRepository.find({
                  where: { subSubSubItemId: subSubSubItem.id },
                });

                if (fields.length) {
                  await this.fieldRepository.remove(fields);
                }

                await this.subSubSubItemRepo.remove(subSubSubItem);
              }

              await this.subSubItemRepository.remove(subSubItem);
            }

            await this.subItemRepository.remove(subItem);
          }

          await this.itemRepository.remove(item);
        }

        await this.menuRepository.remove(menu);
      }

      // 3. Delete the app itself
      await this.appRepository.remove(app);

      return {
        status: 'success',
        message: 'App and related data deleted successfully.',
      };
    } catch (error) {
      console.error('App delete failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete app and related data.',
      };
    }
  }

  //manu
  private async toMenuDto(menu: Menu): Promise<MenuDto> {
    const app = menu.appId
      ? await this.appRepository.findOne({ where: { id: menu.appId } })
      : null;
    console.log('menu appId ' + menu.appId);
    console.log('app name ' + app?.moduleId);
    const module = app?.moduleId
      ? await this.modulesRepository.findOne({ where: { id: app.moduleId } })
      : null;
    console.log('Module name ' + module?.name);
    const moduleDto: ModuleDto | null = module && {
      id: module.id,
      name: module.name,
      tier: module.tier,
      serialNumber: module.serialNumber,
    };

    const appDto: AppDto | null = app && {
      id: app.id,
      name: app.name,
      tier: app.tier,
      serialNumber: app.serialNumber,
      Module: moduleDto,
    };

    return {
      id: menu.id,
      title: menu.title,
      tier: menu.tier,
      serialNumber: menu.serialNumber,
      app: appDto,
    };
  }

  // async findAllMenus(): Promise<MenuDto[]> {
  //   const menus = await this.menuRepository.find();

  //   if (menus.length === 0) {
  //     console.log("No menus found.");
  //     return [];
  //   }

  //   //console.log("First menu appId:", menus[0]?.appId); // use optional chaining for safety

  //   return Promise.all(menus.map(menu => this.toMenuDto(menu)));
  // }

  private async toMenuDto1(
    menu: Menu,
    appsMap: Map<string, App>,
    modulesMap: Map<string, Modules>,
  ): Promise<MenuDto> {
    const app = menu.appId ? (appsMap.get(menu.appId) ?? null) : null;
    const module = app?.moduleId
      ? (modulesMap.get(app.moduleId) ?? null)
      : null;

    const moduleDto: ModuleDto | null = module && {
      id: module.id,
      name: module.name,
      tier: module.tier,
      serialNumber: module.serialNumber,
    };

    const appDto: AppDto | null = app && {
      id: app.id,
      name: app.name,
      tier: app.tier,
      Module: moduleDto,
      serialNumber: app.serialNumber,
    };

    return {
      id: menu.id,
      title: menu.title,
      tier: menu.tier,
      serialNumber: menu.serialNumber,
      app: appDto,
    };
  }

  async findAllMenus(): Promise<MenuDto[]> {
    const [menus, apps, modules] = await Promise.all([
      this.menuRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.appRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
      this.modulesRepository.find({
        order: {
          serialNumber: 'ASC',
        },
      }),
    ]);
    // console.log(apps);
    // console.log(menus);
    // console.log(modules);
    if (menus.length === 0) {
      console.log('No menus found.');
      return [];
    }

    const appsMap = new Map<string, App>(apps.map((app) => [app.id, app]));

    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );

    return Promise.all(
      menus.map((menu) => this.toMenuDto1(menu, appsMap, modulesMap)),
    );
  }

  async findOneMenu(id: string): Promise<MenuDto> {
    const [menu, apps, modules] = await Promise.all([
      this.menuRepository.findOne({
        where: { id },
      }),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);
    if (!menu) {
      console.log('No menu found.');
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    const appsMap = new Map<string, App>(apps.map((app) => [app.id, app]));

    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    //return menu ? await this.toMenuDto(menu) : null;
    return this.toMenuDto1(menu, appsMap, modulesMap);
  }

  async createMenu(menuDto: CreateMenuDto, user: User): Promise<MenuDto> {
    // Create entity instance from DTO
    //const created = this.menuRepository.create(menuDto);
    var menu = new Menu();
    menu.appId = menuDto.appId;
    menu.title = menuDto.title;
    menu.createdAt = new Date();
    menu.updatedAt = new Date();
    menu.userId = user.id;
    menu.createdBy = user.username;
    menu.updatedBy = user.username;
    menu.tier = menuDto.tier;
    menu.serialNumber = menuDto.serialNumber;
    // Save entity to DB
    const saved = await this.menuRepository.save(menu);
    console.log('menu appId ' + saved.appId);
    const [apps, modules] = await Promise.all([
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    const appsMap = new Map<string, App>(apps.map((app) => [app.id, app]));

    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    //return menu ? await this.toMenuDto(menu) : null;
    return this.toMenuDto1(menu, appsMap, modulesMap);
    // return await this.toMenuDto(saved);
  }

  async updateMenu(
    id: string,
    updateDto: CreateMenuDto,
    user: User,
  ): Promise<MenuDto> {
    // Find existing menu by id
    const [menu, apps, modules] = await Promise.all([
      this.menuRepository.findOne({
        where: { id },
      }),
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);
    if (!menu) {
      console.log('No menu found.');
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    const appsMap = new Map<string, App>(apps.map((app) => [app.id, app]));

    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    //return menu ? await this.toMenuDto(menu) : null;
    // Merge updated data into existing entity
    menu.updatedAt = new Date();
    menu.updatedBy = user.username;
    menu.tier = updateDto.tier;
    menu.serialNumber = updateDto.serialNumber;
    const merged = this.menuRepository.merge(menu, updateDto);

    // Save updated entity
    const saved = await this.menuRepository.save(merged);
    return this.toMenuDto1(saved, appsMap, modulesMap);

    // Convert to DTO and return
    // return await this.toMenuDto(saved);
  }

  async deleteMenu(
    menuId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if menu exists
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });
    if (!menu) {
      return { status: 'error', message: `Menu with ID ${menuId} not found.` };
    }

    try {
      // 2. Get all items under the menu
      const items = await this.itemRepository.find({ where: { menuId } });

      for (const item of items) {
        const subItems = await this.subItemRepository.find({
          where: { itemId: item.id },
        });
         const dataPoints=await this.dataPointRepo.find({
              where: { itemId: item.id },
            });
            for (const data of dataPoints) {
                await this.dataPointRepo.remove(data);
              }
        for (const subItem of subItems) {
          const subSubItems = await this.subSubItemRepository.find({
            where: { subItemId: subItem.id },
          });

          for (const subSubItem of subSubItems) {
            const subSubSubItems = await this.subSubSubItemRepo.find({
              where: { subSubItemId: subSubItem.id },
            });

            for (const subSubSubItem of subSubSubItems) {
              const fields = await this.fieldRepository.find({
                where: { subSubSubItemId: subSubSubItem.id },
              });

              if (fields.length) {
                await this.fieldRepository.remove(fields);
              }

              await this.subSubSubItemRepo.remove(subSubSubItem);
            }

            await this.subSubItemRepository.remove(subSubItem);
          }

          await this.subItemRepository.remove(subItem);
        }

        await this.itemRepository.remove(item);
      }

      // 3. Delete the menu itself
      await this.menuRepository.remove(menu);

      return {
        status: 'success',
        message: 'Menu and related data deleted successfully.',
      };
    } catch (error) {
      console.error('Menu delete failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete menu and related data.',
      };
    }
  }

  private async toSubSubSubItemDto(
    entity: SubSubSubItem,
  ): Promise<SubSubSubItemDto> {
    let subSubItemDto: SubSubItemDto | null = null;

    if (entity.subSubItemId) {
      const subSubItem = await this.subSubItemRepository.findOne({
        where: { id: entity.subSubItemId },
      });

      if (!subSubItem) {
        throw new NotFoundException(
          `SubSubItem with ID ${entity.subSubItemId} not found`,
        );
      }

      subSubItemDto = await this.toSubSubItemDto(subSubItem);
    }
    let template: Template | null = null;

    if (entity.templateId) {
      template = await this.TemplateRepo.findOne({
        where: { id: entity.templateId },
      });
    }

    return {
      id: entity.id,
      name: entity.name,
      tier: entity.tier,
      subSubItemId: entity.subSubItemId,
      serialNumber: entity.serialNumber,
      subSubItem: subSubItemDto,
      layout: entity.layout,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      templateText: entity.templateText || null,
      template: template || null,
    };
  }

async findAllSubSubSubItems(): Promise<SubSubSubItemDto[]> {
  const items = await this.subSubSubItemRepo.find({
    order: {
      serialNumber: 'ASC',
    },
  });

  if (!items.length) {
    console.log('No SubSubSubItems found.');
    return [];
  }

  // Map to DTOs with nested resolution
  const dtoList = await Promise.all(
    items.map((i) => this.toSubSubSubItemDto(i)),
  );

  // Sort again in case any async resolution affected ordering
  var data=dtoList.sort((a, b) => a.serialNumber.localeCompare(b.serialNumber));
  //console.log(data);
  return dtoList;
}

  async findOneSubSubSubItem(id: string): Promise<SubSubSubItemDto> {
    const item = await this.subSubSubItemRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`SubSubSubItem with ID ${id} not found`);
    }
    return this.toSubSubSubItemDto(item);
  }

  async createSubSubSubItem(
    dto: CreateSubSubSubItemDto,
    user: any,
  ): Promise<SubSubSubItemDto> {
    const now = new Date();

    const entity = this.subSubSubItemRepo.create({
      name: dto.name,
      tier: dto.tier,
      layout: dto.layout,
      serialNumber: dto.serialNumber,
      templateId: dto.templateId ?? null,
      templateText: dto.templateText ?? null,
      subSubItemId: dto.subSubItemId ?? null,
      userId: user.id,
      createdBy: user.username,
      updatedBy: user.username,
      createdAt: now,
      updatedAt: now,
    } as Partial<SubSubSubItem>); // 👈 Ensure correct typing
    // or you can cast like this if you imported SubSubSubItem directly:
    // } as DeepPartial<SubSubSubItem>);

    const saved = await this.subSubSubItemRepo.save(entity);
    return this.toSubSubSubItemDto(saved);
  }
  async updateSubSubSubItem(
    id: string,
    dto: CreateSubSubSubItemDto,
    user: any,
  ): Promise<SubSubSubItemDto> {
    const existing = await this.subSubSubItemRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`SubSubSubItem with ID ${id} not found`);
    }

    Object.assign(existing, {
      ...dto,
      updatedBy: user.username,
      updatedAt: new Date(),
    });

    const updated = await this.subSubSubItemRepo.save(existing);
    return this.toSubSubSubItemDto(updated);
  }
  async deleteSubSubSubItem(
    subSubSubItemId: string,
  ): Promise<{ status: string; message: string }> {
    // 1. Check if SubSubSubItem exists
    const subSubSubItem = await this.subSubSubItemRepo.findOne({
      where: { id: subSubSubItemId },
    });
    if (!subSubSubItem) {
      return {
        status: 'error',
        message: `SubSubSubItem with ID ${subSubSubItemId} not found.`,
      };
    }

    try {
      // 2. Get all fields under this SubSubSubItem
      const fields = await this.fieldRepository.find({
        where: { subSubSubItemId },
      });

      if (fields.length > 0) {
        await this.fieldRepository.remove(fields);
      }

      // 3. Remove the SubSubSubItem itself
      await this.subSubSubItemRepo.remove(subSubSubItem);

      return {
        status: 'success',
        message: 'SubSubSubItem and related fields deleted successfully.',
      };
    } catch (error) {
      console.error('SubSubSubItem deletion failed:', error);
      return {
        status: 'error',
        message: 'Failed to delete SubSubSubItem and related fields.',
      };
    }
  }
private async toDataPointDto(entity: DataPoint): Promise<DataPointDto> {
  if (!entity.itemId) {
    throw new BadRequestException('DataPoint must have a valid itemId');
  }

  const item = await this.itemRepository.findOne({
    where: { id: entity.itemId },
  });

  if (!item) {
    throw new NotFoundException(`Item with ID ${entity.itemId} not found`);
  }

  const itemDto: ItemDto = await this.toItemDto(item); // Assuming this method exists
  var field=await this.fieldRepository.findOne({
    where: { id: entity.dpGroupCode },
  });
  return {
    id: entity.id,
    DpGroup: field,
    dataPoint: entity.dataPoint,
    serialNumber: entity.serialNumber,
    dataType: entity.dataType,
    isRequired: entity.isRequired,
    isHide: entity.isHide,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    createdBy: entity.createdBy,
    updatedBy: entity.updatedBy,
    userId: entity.userId,
    Item: itemDto,
  } as DataPointDto;
}

async findAllDataPoint(): Promise<DataPointDto[]> {
  const dataPoints = await this.dataPointRepo.find({
    order: {
      serialNumber: 'ASC',
    },
  });

  if (!dataPoints.length) {
    console.log('No data points found.');
    return [];
  }

  const dtoList = await Promise.all(
    dataPoints.map((dp) => this.toDataPointDto(dp)),
  );

  return dtoList;
}
 
  async findOneDataPoint(id: string): Promise<DataPointDto> {
    const dp = await this.dataPointRepo.findOne({ where: { id } });
    if (!dp) throw new NotFoundException(`DataPoint with ID ${id} not found`);
    return this.toDataPointDto(dp);
  }

  async createDataPoint(
    dto: CreateDataPointDto,
    user: any,
  ): Promise<DataPointDto> {
    const newEntity = this.dataPointRepo.create({
      dataPoint: dto.dataPoint,
      dataType: dto.dataType,
      dpGroupCode: dto.dpGroupCode,
      isHide: dto.isHide,
      isRequired: dto.isRequired,
      itemId: dto.itemId,
      serialNumber: dto.serialNumber,
      userId: user?.id||null,
      createdAt:Date(),
      updatedAt:Date(),
      createdBy: user?.username || null,
      updatedBy: user?.username || null,
    });

    const saved = await this.dataPointRepo.save(newEntity);
    return this.toDataPointDto(saved);
  }

  async updateDataPoint(
    id: string,
    dto: CreateDataPointDto,
    user: any,
  ): Promise<DataPointDto> {
    const existing = await this.dataPointRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`DataPoint with ID ${id} not found`);
    }

    Object.assign(existing, dto, {
      userId: user?.id,
      updatedAt:Date(),
      updatedBy: user?.username
    });

    const updated = await this.dataPointRepo.save(existing);
    return this.toDataPointDto(updated);
  }

  async deleteDataPoint(
    id: string,
  ): Promise<{ status: string; message: string }> {
    const existing = await this.dataPointRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`DataPoint with ID ${id} not found`);
    }

    await this.dataPointRepo.delete(id);
    return {
      status: 'success',
      message: `DataPoint ${id} deleted successfully.`,
    };
  }
  async getDataCount(user: any): Promise<TotalCount> {
  const userId = user.id;

  const [modules, apps, menus, items, subItems, subSubItems, subSubSubItems, fields, dataPoints] =
    await Promise.all([
      this.modulesRepository.count({ where: { userId } }),
      this.appRepository.count({ where: { userId } }),
      this.menuRepository.count({ where: { userId } }),
      this.itemRepository.count({ where: { userId } }),
      this.subItemRepository.count({ where: { userId } }),
      this.subSubItemRepository.count({ where: { userId } }),
      this.subSubSubItemRepo.count({ where: { userId } }),
      this.fieldRepository.count({ where: { userId } }),
      this.dataPointRepo.count({ where: { userId } }),
    ]);

  const count = new TotalCount();
  count.modules = modules;
  count.apps = apps;
  count.menus = menus;
  count.items = items;
  count.subItems = subItems;
  count.subSubItems = subSubItems;
  count.subSubSubItems = subSubSubItems;
  count.fields = fields;
  count.dataPoints = dataPoints;

  return count;
}

async GetallItemBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataGroup()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

async GetallSubItemBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataGroup()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

async GetallSSBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataGroup()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

async GetallSSSBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataGroup()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

async findAllDataBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataGroup()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}
async findAllDataPointBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL GetDataPoint()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

async ReportBySP(): Promise<DataPointDto[]> {
  // Call the stored procedure via raw SQL query
  const rawResult: any[] = await this.dataPointRepo.manager.query('CALL ReportData()');

  // rawResult is an array where rawResult[0] contains the actual rows
  const rows = rawResult[0];

  if (!rows || rows.length === 0) {
    console.log('No data points found from stored procedure.');
    return [];
  }

  // Map each row to your DTO
  //const dtoList = rows.map(row => this.toDataPointDto(row));

  return rows;
}

}
