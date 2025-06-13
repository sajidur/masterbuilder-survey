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
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { CreateSubSubItemDto, SubSubItemDto } from './module.dto/subSubItem.dto';
import { CreateFieldDto, FieldDto } from './module.dto/field.dto';
import { Module } from '@nestjs/core/injector/module';
import { ModuleDto } from './module.dto/create-module.dto';
@Injectable()
export class SurveyModuleService {
  constructor(
    @InjectRepository(Modules) private readonly modulesRepository: Repository<Modules>,
    @InjectRepository(App) private readonly appRepository: Repository<App>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(SubItem) private readonly subItemRepository: Repository<SubItem>,
    @InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
    @InjectRepository(SubSubItem) private readonly subSubItemRepository: Repository<SubSubItem>,
  ) {}
  //subsubitem
async toSubSubItemDto(subSubItem: SubSubItem): Promise<SubSubItemDto> {
  let subItemDto: SubItemDto | null = null;
    const subItem = await this.subItemRepository.findOne({
      where: { id: subSubItem.subItemId }
    });
    if(!subItem){
        throw new NotFoundException(`SubItem with ID ${subSubItem.subItemId} not found`);
    }

  return {
    id: subSubItem.id,
    name: subSubItem.name,
    subItemId: subSubItem?.subItemId,
    subItem: await this.toSubItemDto(subItem),
  };
}



//  async findAllSubSubItem(): Promise<SubSubItemDto[]> {
//   const items = await this.subSubItemRepository.find();
//   return Promise.all(items.map(item => this.toSubSubItemDto(item)));
// }
private async toSubSubItemDto1(
  subSubItem: SubSubItem,
  subItemDtoMap: Map<string, SubItemDto>
): Promise<SubSubItemDto> {
  if (!subSubItem.subItemId) {
    throw new BadRequestException('SubSubItem must have a valid subItemId');
  }

  const subItemDto = subItemDtoMap.get(subSubItem.subItemId);
  if (!subItemDto) {
    throw new NotFoundException(`SubItem with ID ${subSubItem.subItemId} not found in cache`);
  }

  return {
    id: subSubItem.id,
    name: subSubItem.name,
    subItemId: subSubItem.subItemId,
    subItem: subItemDto,
  };
}


async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  const [
    subSubItems,
    subItems,
    items,
    menus,
    apps,
    modules,
  ] = await Promise.all([
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
  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
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
      console.warn(`Item with ID ${subItem.itemId} not found for SubItem ${subItem.id}`);
      continue;
    }

    subItemDtoMap.set(subItem.id, {
      id: subItem.id,
      name: subItem.name,
      itemId: subItem.itemId,
      item: itemDto,
    });
  }

  return Promise.all(
    subSubItems.map(subSubItem => this.toSubSubItemDto1(subSubItem, subItemDtoMap))
  );
}

async findOneSubSubItem(id: string): Promise<SubSubItemDto> {
  const item = await this.subSubItemRepository.findOne({
    where: { id }
  });
  if (!item) {
    throw new NotFoundException(`SubSubItem with ID ${id} not found`);
  }
  return this.toSubSubItemDto(item);
}

async createSubSubItem(data: CreateSubSubItemDto): Promise<SubSubItemDto> {
  var subSubItem=new SubSubItem();
  subSubItem.name=data.name;
  subSubItem.subItemId=data.subItemId;
  const saved = await this.subSubItemRepository.save(subSubItem);
  return this.toSubSubItemDto(saved);
}

async updateSubSubItem(id: string, data: CreateSubSubItemDto): Promise<SubSubItemDto> {
    const existing = await this.subSubItemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`SubSubItem with ID ${id} not found`);
  }
 existing.name=data.name;
 existing.subItemId=data.subItemId;
 var updatedData=await this.subSubItemRepository.save(existing);
  return this.toSubSubItemDto(updatedData);
}

  async deleteSubSubItem(id: string): Promise<void> {
    const result = await this.subSubItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubSubItem with ID ${id} not found`);
    }
  }
  //field
  async toFieldDto(field: Field): Promise<FieldDto> {
  const subSubItem1 = await this.subSubItemRepository.findOneBy({id:field.subSubItemId});
  if(!subSubItem1){
       throw new NotFoundException(`SubSubItem with ID ${field.subSubItemId} not found`);
  }
  return {
    id: field.id,
    name: field.name,
    subSubItemId: field.subSubItemId,
    subSubItem:await this.toSubSubItemDto(subSubItem1),
  };
}
async toFieldDto1(field: Field, subSubItemMap: Map<string, SubSubItem>): Promise<FieldDto> {
  const subSubItem = subSubItemMap.get(field.subSubItemId);
  if (!subSubItem) {
    throw new NotFoundException(`SubSubItem with ID ${field.subSubItemId} not found`);
  }

  return {
    id: field.id,
    name: field.name,
    subSubItemId: field.subSubItemId,
    subSubItem: await this.toSubSubItemDto(subSubItem),
  };
}
async findAllFields(): Promise<FieldDto[]> {
  const fields = await this.fieldRepository.find();

  if (!fields.length) return [];

  const subSubItemIds = Array.from(new Set(fields.map(f => f.subSubItemId)));
  const subSubItems = await this.subSubItemRepository.findByIds(subSubItemIds);
  const subSubItemMap = new Map(subSubItems.map(sub => [sub.id, sub]));
  return Promise.all(fields.map(field => this.toFieldDto1(field, subSubItemMap)));
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

  const subSubItem = await this.subSubItemRepository.findOneBy({ id: field.subSubItemId });
  if (!subSubItem) {
    throw new NotFoundException(`SubSubItem with ID ${field.subSubItemId} not found`);
  }

  return {
    id: field.id,
    name: field.name,
    subSubItemId: field.subSubItemId,
    subSubItem: await this.toSubSubItemDto(subSubItem),
  };
}
async createField(field: CreateFieldDto): Promise<FieldDto> {
  const newField = new Field();
  newField.name = field.name;
  newField.subSubItemId = field.subSubItemId;

  const saved = await this.fieldRepository.save(newField);

  const subSubItem = await this.subSubItemRepository.findOneBy({ id: saved.subSubItemId });
  if (!subSubItem) {
    throw new NotFoundException(`SubSubItem with ID ${saved.subSubItemId} not found`);
  }

  return {
    id: saved.id,
    name: saved.name,
    subSubItemId: saved.subSubItemId,
    subSubItem: await this.toSubSubItemDto(subSubItem),
  };
}
async updateField(id: string, updated: CreateFieldDto): Promise<FieldDto> {
  const existing = await this.fieldRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Field with ID ${id} not found`);
  }

  existing.name = updated.name;
  existing.subSubItemId = updated.subSubItemId;

  const saved = await this.fieldRepository.save(existing);

  const subSubItem = await this.subSubItemRepository.findOneBy({ id: saved.subSubItemId });
  if (!subSubItem) {
    throw new NotFoundException(`SubSubItem with ID ${saved.subSubItemId} not found`);
  }

  return {
    id: saved.id,
    name: saved.name,
    subSubItemId: saved.subSubItemId,
    subSubItem: await this.toSubSubItemDto(subSubItem),
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
  itemDtoMap: Map<string, ItemDto>
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

  return {
    id: subItem.id,
    name: subItem.name,
    itemId,
    item: itemDto,
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
    console.log("No sub-items found.");
    return [];
  }

  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
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
      menu: menuDto,
    });
  }

  return Promise.all(
    subItems.map(subItem => this.toSubItemDto1(subItem, itemDtoMap))
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
  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(m => [m.id, m]));

  // Construct menuDtoMap
  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
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
      menu: menuDto,
    });
  }

  // Use cached itemDtoMap to build SubItemDto
  return this.toSubItemDto1(subItem, itemDtoMap);
}


// async findOneSubItem(id: string): Promise<SubItem | null> {
//   return this.subItemRepository.findOne({ where: { id } });
// }

async createSubItem(subItem: CreateSubItemDto): Promise<SubItemDto> {
var newSubItem=new SubItem();
newSubItem.name=subItem.name;
newSubItem.itemId=subItem.itemId;
var data= this.subItemRepository.save(newSubItem);
   // Fetch all related data in parallel for mapping
  const [items, menus, apps, modules] = await Promise.all([
    this.itemRepository.find(),
    this.menuRepository.find(),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  // Build maps for quick lookup
  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(m => [m.id, m]));

  // Construct menuDtoMap
  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
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
      menu: menuDto,
    });
  }

  // Use cached itemDtoMap to build SubItemDto
  return this.toSubItemDto1(await data, itemDtoMap);
}

async updateSubItem(id: string, updated: CreateSubItemDto): Promise<SubItemDto> {
  const existing = await this.subItemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`SubItem with ID ${id} not found`);
  }
  existing.name=updated.name;
  existing.itemId=updated.itemId;
  const data= this.subItemRepository.save(existing);
    // Fetch all related data in parallel for mapping
  const [items, menus, apps, modules] = await Promise.all([
    this.itemRepository.find(),
    this.menuRepository.find(),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  // Build maps for quick lookup
  const appMap = new Map(apps.map(app => [app.id, app]));
  const moduleMap = new Map(modules.map(m => [m.id, m]));

  // Construct menuDtoMap
  const menuDtoMap = new Map<string, MenuDto>();
  for (const menu of menus) {
    const app = appMap.get(menu.appId);
    const module = app?.moduleId ? moduleMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
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

  if (itemId === undefined||itemId==null) {
    throw new BadRequestException('SubItem must have a valid itemId');
  }

  const item = await this.itemRepository.findOne({
    where: { id: itemId },
  });

  if (!item) {
    throw new NotFoundException(`Item with ID ${itemId} not found`);
  }

  itemDto = await this.toItemDto(item);

  return {
    id: subItem.id,
    name: subItem.name,
    itemId: itemId, // Now guaranteed to be number
    item: itemDto,
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
    where: { id: item.menuId }
 
  });
   console.log("menu title "+menu?.title);
  if (!menu) {
    throw new NotFoundException(`Menu with ID ${item.menuId} not found`);
  }

  return {
    id: item.id,
    name: item.name,
    menu: await this.toMenuDto(menu),
  };
}



// async findAllItems(): Promise<ItemDto[]> {
//   const items = await this.itemRepository.find();
//   return Promise.all(items.map(item => this.toItemDto(item)));
// }
private async toItemDto1(
  item: Item,
  menuDtoMap: Map<string, MenuDto>
): Promise<ItemDto> {
  const menuDto = menuDtoMap.get(item.menuId);

  if (!menuDto) {
    throw new NotFoundException(`Menu with ID ${item.menuId} not found`);
  }

  return {
    id: item.id,
    name: item.name,
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
    console.log("No items found.");
    return [];
  }

  const appsMap = new Map(apps.map(app => [app.id, app]));
  const modulesMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();

  for (const menu of menus) {
    const app = appsMap.get(menu.appId);
    const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
      app: appDto,
    });
  }

  return Promise.all(items.map(item => this.toItemDto1(item, menuDtoMap)));
}


async findOneItem(id: string): Promise<ItemDto | null> {

  const [item, menus, apps, modules] = await Promise.all([
   this.itemRepository.findOne({ where: { id } }),
    this.menuRepository.find(),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  if (!item) {
    console.log("No items found.");
    return null ;
  }
  const appsMap = new Map(apps.map(app => [app.id, app]));
  const modulesMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
   for (const menu of menus) {
    const app = appsMap.get(menu.appId);
    const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;

    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
      app: appDto,
    });
  }
  return  this.toItemDto1(item, menuDtoMap);
}

async createItem(item: CreateItemDto): Promise<ItemDto> {
  var newItem=new Item();
newItem.name=item.name;
newItem.menuId=item.menuId;
  const created = await this.itemRepository.save(newItem);
   const [ menus, apps, modules] = await Promise.all([
    this.menuRepository.find(),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);
  const appsMap = new Map(apps.map(app => [app.id, app]));
  const modulesMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
   for (const menu of menus) {
    const app = appsMap.get(menu.appId);
    const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
      app: appDto,
    });
  }
  return  this.toItemDto1(created, menuDtoMap);
 // return this.toItemDto(created);
}

async updateItem(id: string, updatedItem: CreateItemDto): Promise<ItemDto> {
   const [item, menus, apps, modules] = await Promise.all([
   this.itemRepository.findOne({ where: { id } }),
    this.menuRepository.find(),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  if (!item) {
    console.log("No items found.");
    throw new NotFoundException(`Item with ID ${id} not found`);
  }
  item.menuId=updatedItem.menuId;
  item.name=updatedItem.name;
  const saved = await this.itemRepository.save(item);
  const appsMap = new Map(apps.map(app => [app.id, app]));
  const modulesMap = new Map(modules.map(mod => [mod.id, mod]));

  const menuDtoMap = new Map<string, MenuDto>();
   for (const menu of menus) {
    const app = appsMap.get(menu.appId);
    const module = app?.moduleId ? modulesMap.get(app.moduleId) : null;
    const moduleDto: ModuleDto | null = module
      ? { id: module.id, name: module.name }
      : null;

    const appDto: AppDto | null = app
      ? { id: app.id, name: app.name, Module: moduleDto }
      : null;

    menuDtoMap.set(menu.id, {
      id: menu.id,
      title: menu.title,
      app: appDto,
    });
  }
  return  this.toItemDto1(saved, menuDtoMap);
 

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
 async update(id: string, moduleDto: Partial<Modules>): Promise<Modules> {
  const existing = await this.modulesRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Module with ID ${id} not found`);
  }
  const merged = this.modulesRepository.merge(existing, moduleDto);
  return this.modulesRepository.save(merged);
}

  create(user: Partial<Modules>): Promise<Modules> {
    return this.modulesRepository.save(user);
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

  private async toDto(app: App, modulesMap: Map<String,Module>): Promise<AppDto|null> {
  const module = modulesMap.get(app.moduleId);

  if (!module) {
   // throw new NotFoundException(`Module with ID ${app.moduleId} not found`);
   return null;
  }

  return {
    id: app.id,
    name: app.name,
    Module: module,
  };
}

async findAllApps(): Promise<AppDto[]> {
  const [apps, modules] = await Promise.all([
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  if (!apps.length || !modules.length) return [];
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  const appDtos = await Promise.all(
    apps.map(app => this.toDto(app, modulesMap))
  );

  // Filter out nulls (apps whose modules were not found)
  return appDtos.filter((dto): dto is AppDto => dto !== null);
}


async findOneApp(id: string): Promise<AppDto | null> {
  const [app, modules] = await Promise.all([
    this.appRepository.findOne({ where: { id } }),
    this.modulesRepository.find(),
  ]);

  if (!app)  throw new NotFoundException(`App with ID ${id} not found`);

const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  return this.toDto(app, modulesMap);
}

async createApp(createAppDto: CreateAppDto): Promise<AppDto|null> {
const [modules] = await Promise.all([this.modulesRepository.find()]);
const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
const module = modulesMap.get(createAppDto.moduleId);
console.log(module);
  if (!module) {
    throw new NotFoundException(`Module with ID ${createAppDto.moduleId} not found`);
  }
  const app = this.appRepository.create({
    name: createAppDto.name,
    moduleId: createAppDto.moduleId,
  });

  const created = await this.appRepository.save(app);
  return this.toDto(created, modulesMap);
}

async updateApp(id: string, app: UpdateAppDto): Promise<AppDto|null> {
  const [modules] = await Promise.all([this.modulesRepository.find()]);
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  const module = modulesMap.get(app.moduleId);
  console.log(module);
  if (!module) {
    throw new NotFoundException(`Module with ID ${app.moduleId} not found`);
  }
  const existing = await this.appRepository.preload({ id, ...app });

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
    console.log("menu appId "+menu.appId);
console.log("app name "+app?.moduleId);
  const module = app?.moduleId
    ? await this.modulesRepository.findOne({ where: { id: app.moduleId } })
    : null;
console.log("Module name "+module?.name);
  const moduleDto: ModuleDto | null = module && {
    id: module.id,
    name: module.name,
  };

  const appDto: AppDto | null = app && {
    id: app.id,
    name: app.name,
    Module: moduleDto,
  };

  return {
    id: menu.id,
    title: menu.title,
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
  modulesMap: Map<string, Module>
): Promise<MenuDto> {
  const app = menu.appId ? appsMap.get(menu.appId) ?? null : null;
  const module = app?.moduleId ? modulesMap.get(app.moduleId) ?? null : null;

  const moduleDto: ModuleDto | null = module && {
    id: module.id,
    name: module.name,
  };

  const appDto: AppDto | null = app && {
    id: app.id,
    name: app.name,
    Module: moduleDto,
  };

  return {
    id: menu.id,
    title: menu.title,
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
    console.log("No menus found.");
    return [];
  }

  const appsMap = new Map<string, App>(apps.map(app => [app.id, app]));
  
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));

  return Promise.all(
    menus.map(menu => this.toMenuDto1(menu, appsMap, modulesMap))
  );
}

async findOneMenu(id: string): Promise<MenuDto> {
   const [menu, apps, modules] = await Promise.all([
   this.menuRepository.findOne({
    where: { id }}),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);
if (!menu) {
    console.log("No menu found.");
    throw new NotFoundException(`Menu with ID ${id} not found`);
  }

  const appsMap = new Map<string, App>(apps.map(app => [app.id, app]));
  
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  //return menu ? await this.toMenuDto(menu) : null;
 return  this.toMenuDto1(menu, appsMap, modulesMap);
}

async createMenu(menuDto: CreateMenuDto): Promise<MenuDto> {
  // Create entity instance from DTO
  //const created = this.menuRepository.create(menuDto);
  var menu=new Menu();
  menu.appId=menuDto.appId;
  menu.title=menuDto.title;
  // Save entity to DB
  const saved = await this.menuRepository.save(menu);
  console.log("menu appId "+saved.appId);
   const [apps, modules] = await Promise.all([
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);

  const appsMap = new Map<string, App>(apps.map(app => [app.id, app]));
  
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  //return menu ? await this.toMenuDto(menu) : null;
 return  this.toMenuDto1(menu, appsMap, modulesMap);
 // return await this.toMenuDto(saved);
}

async updateMenu(id: string, updateDto: CreateMenuDto): Promise<MenuDto> {
  // Find existing menu by id
  const [menu, apps, modules] = await Promise.all([
   this.menuRepository.findOne({
    where: { id }}),
    this.appRepository.find(),
    this.modulesRepository.find(),
  ]);
if (!menu) {
    console.log("No menu found.");
    throw new NotFoundException(`Menu with ID ${id} not found`);
  }

  const appsMap = new Map<string, App>(apps.map(app => [app.id, app]));
  
  const modulesMap = new Map<string, Module>(modules.map(m => [m.id, m as unknown as Module]));
  //return menu ? await this.toMenuDto(menu) : null;
    // Merge updated data into existing entity
  const merged = this.menuRepository.merge(menu, updateDto);

  // Save updated entity
  const saved = await this.menuRepository.save(merged);
 return  this.toMenuDto1(saved, appsMap, modulesMap);

  // Convert to DTO and return
 // return await this.toMenuDto(saved);
}


  async deleteMenu(id: string): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

}
