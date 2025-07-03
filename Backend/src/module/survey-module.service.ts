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
import { CreateFieldDto, FieldDto } from './module.dto/field.dto';
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
@Injectable()
export class SurveyModuleService {
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
    const template = await this.TemplateRepo.findOne({
      where: { id: subSubItem.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');
    return {
      id: subSubItem.id,
      name: subSubItem.name,
      tier: subSubItem.tier,
      serialNumber:subSubItem.serialNumber,
      subItemId: subSubItem?.subItemId,
      subItem: await this.toSubItemDto(subItem),
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
    const template = await this.TemplateRepo.findOne({
      where: { id: subSubItem.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');
    return {
      id: subSubItem.id,
      name: subSubItem.name,
      tier: subSubItem.tier,
      serialNumber:subSubItem.serialNumber,
      subItemId: subSubItem.subItemId,
      subItem: subItemDto,
      template: template || null,
    };
  }

  async findAllSubSubItem(): Promise<SubSubItemDto[]> {
    const [subSubItems, subItems, items, menus, apps, modules] =
      await Promise.all([
        this.subSubItemRepository.find(),
        this.subItemRepository.find(),
        this.itemRepository.find(),
        this.menuRepository.find(),
        this.appRepository.find(),
        this.modulesRepository.find(),
      ]);

    if (!subSubItems.length) {
      console.log('No sub-sub-items found.');
      return [];
    }

    // Build maps for quick lookup
    const appMap = new Map(apps.map((app) => [app.id, app]));
    const moduleMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appMap.get(menu.appId);
      const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

      const moduleDto: ModuleDto | null = module
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
        navigationTo: subItem.navigationTo,
        description: subItem.description,
        itemId: subItem.itemId,
        item: itemDto,
      });
    }

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
    subSubItem.serialNumber=data.serialNumber;
    subSubItem.templateId = data.templateId;
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
    existing.serialNumber=data.serialNumber;
    existing.templateId = data.templateId;
    var updatedData = await this.subSubItemRepository.save(existing);
    return this.toSubSubItemDto(updatedData);
  }

  async deleteSubSubItem(id: string): Promise<void> {
    const result = await this.subSubItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubSubItem with ID ${id} not found`);
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
    field: Field,
    subSubSubItemMap: Map<string, SubSubSubItem>,
  ): Promise<FieldDto> {
    const subSubSubItem = subSubSubItemMap.get(field.subSubSubItemId);
    if (!subSubSubItem) {
      throw new NotFoundException(
        `SubSubItem with ID ${field.subSubSubItemId} not found`,
      );
    }

    return {
      id: field.id,
      name: field.name,
      isRequired: field.isRequired,
      fieldType: field.fieldType,
      displayType: field.displayType,
      serialNumber: field.serialNumber,
      subSubSubItemId: field.subSubSubItemId,
      subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
    };
  }
  async findAllFields(): Promise<FieldDto[]> {
    const fields = await this.fieldRepository.find();

    if (!fields.length) return [];

    const subSuSubItemIds = Array.from(
      new Set(fields.map((f) => f.subSubSubItemId)),
    );
    const subSubSubItems =
      await this.subSubSubItemRepo.findByIds(subSuSubItemIds);
    const subSubSubItemMap = new Map(
      subSubSubItems.map((sub) => [sub.id, sub]),
    );
    return Promise.all(
      fields.map((field) => this.toFieldDto1(field, subSubSubItemMap)),
    );
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

    const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
      id: field.subSubSubItemId,
    });
    if (!subSubSubItem) {
      throw new NotFoundException(
        `SubSubItem with ID ${field.subSubSubItemId} not found`,
      );
    }

    return {
      id: field.id,
      name: field.name,
      isRequired: field.isRequired,
      fieldType: field.fieldType,
      displayType: field.displayType,
      serialNumber: field.serialNumber,
      subSubSubItemId: field.subSubSubItemId,
      subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
    };
  }
  async createField(field: CreateFieldDto, user: User): Promise<FieldDto> {
    const newField = new Field();
    newField.name = field.name;
    newField.subSubSubItemId = field.subSubSubItemId;
    newField.updatedAt = new Date();
    newField.updatedBy = user.username;
    newField.createdAt = new Date();
    newField.createdBy = user.username;
    newField.userId = user.id;
    newField.serialNumber = field.serialNumber;
    newField.displayType = field.displayType;
    newField.fieldType = field.fieldType;
    newField.isRequired = field.isRequired;
    const saved = await this.fieldRepository.save(newField);

    const subSubItem = await this.subSubSubItemRepo.findOneBy({
      id: saved.subSubSubItemId,
    });
    if (!subSubItem) {
      throw new NotFoundException(
        `SubSubItem with ID ${saved.subSubSubItemId} not found`,
      );
    }

    return {
      id: saved.id,
      name: saved.name,
      displayType: field.displayType,
      serialNumber: field.serialNumber,
      fieldType: field.fieldType,
      isRequired: field.isRequired,
      subSubSubItemId: saved.subSubSubItemId,
      subSubSubItem: await this.toSubSubSubItemDto(subSubItem),
    };
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

    existing.name = updated.name;
    existing.subSubSubItemId = updated.subSubSubItemId;
    existing.updatedAt = new Date();
    existing.updatedBy = user.username;
    existing.displayType = updated.displayType;
    existing.serialNumber = updated.serialNumber;
    existing.isRequired = updated.isRequired;
    existing.fieldType = updated.fieldType;
    existing.userId = user.id;
    const saved = await this.fieldRepository.save(existing);

    const subSubSubItem = await this.subSubSubItemRepo.findOneBy({
      id: saved.subSubSubItemId,
    });
    if (!subSubSubItem) {
      throw new NotFoundException(
        `SubSubSubItem with ID ${saved.subSubSubItemId} not found`,
      );
    }

    return {
      id: saved.id,
      name: saved.name,
      isRequired: saved.isRequired,
      fieldType: saved.fieldType,
      displayType: saved.displayType,
      serialNumber: saved.serialNumber,
      subSubSubItemId: saved.subSubSubItemId,
      subSubSubItem: await this.toSubSubSubItemDto(subSubSubItem),
    };
  }

  async deleteField(id: string): Promise<void> {
    const result = await this.fieldRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Field with ID ${id} not found`);
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
    const template = await this.TemplateRepo.findOne({
      where: { id: subItem.templateId },
    });

    return {
      id: subItem.id,
      name: subItem.name,
      tier: subItem.tier,
      serialNumber: subItem.serialNumber,
      buttonType: subItem.buttonType,
      navigationTo: subItem.navigationTo,
      description: subItem.description,
      itemId,
      item: itemDto,
      template: template || null,
    };
  }

  async findAllSubItems(): Promise<SubItemDto[]> {
    const [subItems, items, menus, apps, modules] = await Promise.all([
      this.subItemRepository.find(),
      this.itemRepository.find(),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
    newSubItem.templateId = subItem.templateId;
    newSubItem.tier = subItem.tier;
    newSubItem.serialNumber=subItem.serialNumber;
    newSubItem.buttonType=subItem.buttonType;
    newSubItem.navigationTo=subItem.navigationTo;
    newSubItem.description=subItem.description;
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
    existing.templateId = updated.templateId;
    existing.serialNumber=updated.serialNumber;
    existing.buttonType=updated.buttonType;
    existing.navigationTo=updated.navigationTo;
    existing.description=updated.description;
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
    const template = await this.TemplateRepo.findOne({
      where: { id: subItem.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');
    return {
      id: subItem.id,
      name: subItem.name,
      tier: subItem.tier,
      serialNumber: subItem.serialNumber,
      buttonType: subItem.buttonType,
      navigationTo: subItem.navigationTo,
      description: subItem.description,
      itemId: itemId, // Now guaranteed to be number
      item: itemDto,
      template: template || null,
    };
  }

  async deleteSubItem(id: string): Promise<void> {
    const result = await this.subItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubItem with ID ${id} not found`);
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
      navigationTo: item.navigationTo,
      description: item.description,
      menu: menuDto,
    };
  }

  async findAllItems(): Promise<ItemDto[]> {
    const [items, menus, apps, modules] = await Promise.all([
      this.itemRepository.find(),
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
    newItem.serialNumber=item.serialNumber;
    newItem.buttonType=item.buttonType;
    newItem.navigationTo=item.navigationTo;
    newItem.description=item.description;
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
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier,serialNumber:app.serialNumber, Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
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
    item.serialNumber=updatedItem.serialNumber;
    item.buttonType=updatedItem.buttonType;
    item.navigationTo=updatedItem.navigationTo;
    item.description=updatedItem.description;
    item.tier = updatedItem.tier;
    const saved = await this.itemRepository.save(item);
    const appsMap = new Map(apps.map((app) => [app.id, app]));
    const modulesMap = new Map(modules.map((mod) => [mod.id, mod]));

    const menuDtoMap = new Map<string, MenuDto>();
    for (const menu of menus) {
      const app = appsMap.get(menu.appId);
      const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
      const moduleDto: ModuleDto | null = module
        ? { id: module.id, name: module.name, tier: module.tier,serialNumber:module.serialNumber }
        : null;

      const appDto: AppDto | null = app
        ? { id: app.id, name: app.name, tier: app.tier, serialNumber:app.serialNumber,Module: moduleDto }
        : null;

      menuDtoMap.set(menu.id, {
        id: menu.id,
        title: menu.title,
        tier: menu.tier,
        serialNumber:menu.serialNumber,
        app: appDto,
      });
    }
    return this.toItemDto1(saved, menuDtoMap);

    //console.log(saved.name);
    //  return this.toItemDto(saved);
  }

  async deleteItem(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
  //modules
  findAll(): Promise<Modules[]> {
    return this.modulesRepository.find();
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
      serialNumber:dto.serialNumber,
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
      serialNumber:dto.serialNumber,
      updatedAt: new Date(),
      updatedBy: user.username,
    });

    return this.modulesRepository.save(module);
  }

  async remove(id: string): Promise<void> {
    await this.modulesRepository.delete(id);
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
      serialNumber:app.serialNumber,
      Module: module,
    };
  }

  async findAllApps(): Promise<AppDto[]> {
    const [apps, modules] = await Promise.all([
      this.appRepository.find(),
      this.modulesRepository.find(),
    ]);

    if (!apps.length || !modules.length) return [];
    const modulesMap = new Map<string, Modules>(
      modules.map((m) => [m.id, m as unknown as Modules]),
    );
    const appDtos = await Promise.all(
      apps.map((app) => this.toDto(app, modulesMap)),
    );

    // Filter out nulls (apps whose modules were not found)
    return appDtos.filter((dto): dto is AppDto => dto !== null);
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
      tier: createAppDto.tier,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      serialNumber:createAppDto.serialNumber,
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

  async deleteApp(id: string): Promise<void> {
    await this.appRepository.delete(id);
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
      serialNumber:module.serialNumber
    };

    const appDto: AppDto | null = app && {
      id: app.id,
      name: app.name,
      tier: app.tier,
      serialNumber:app.serialNumber,
      Module: moduleDto
    };

    return {
      id: menu.id,
      title: menu.title,
      tier: menu.tier,
      serialNumber:menu.serialNumber,
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
      serialNumber:module.serialNumber
    };

    const appDto: AppDto | null = app && {
      id: app.id,
      name: app.name,
      tier: app.tier,
      Module: moduleDto,
      serialNumber:app.serialNumber
    };

    return {
      id: menu.id,
      title: menu.title,
      tier: menu.tier,
      serialNumber:menu.serialNumber,
      app: appDto,
    };
  }

  async findAllMenus(): Promise<MenuDto[]> {
    const [menus, apps, modules] = await Promise.all([
      this.menuRepository.find(),
      this.appRepository.find(),
      this.modulesRepository.find(),
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
    menu.serialNumber=menuDto.serialNumber;
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
    menu.serialNumber=updateDto.serialNumber;
    const merged = this.menuRepository.merge(menu, updateDto);

    // Save updated entity
    const saved = await this.menuRepository.save(merged);
    return this.toMenuDto1(saved, appsMap, modulesMap);

    // Convert to DTO and return
    // return await this.toMenuDto(saved);
  }

  async deleteMenu(id: string): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
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
    const template = await this.TemplateRepo.findOne({
      where: { id: entity.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');
    return {
      id: entity.id,
      name: entity.name,
      tier: entity.tier,
      templateId: entity.templateId,
      subSubItemId: entity.subSubItemId,
      serialNumber:entity.serialNumber,
      subSubItem: subSubItemDto,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      template: template || null,
    };
  }

  async findAllSubSubSubItems(): Promise<SubSubSubItemDto[]> {
    const items = await this.subSubSubItemRepo.find();
    return Promise.all(items.map((i) => this.toSubSubSubItemDto(i)));
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
    const entity = this.subSubSubItemRepo.create({
      ...dto,
      createdBy: user.username,
      updatedBy: user.username,
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId: dto.templateId,
      tier: dto.tier,
      userId: user.id,
    });

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

  async deleteSubSubSubItem(id: string): Promise<void> {
    const result = await this.subSubSubItemRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubSubSubItem with ID ${id} not found`);
    }
  }
}
