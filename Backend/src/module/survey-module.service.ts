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
    label: subSubItem.label,
    subItemId: subSubItem?.subItemId,
    subItem: await this.toSubItemDto(subItem),
  };
}



 async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  const items = await this.subSubItemRepository.find();
  return Promise.all(items.map(item => this.toSubSubItemDto(item)));
}

async findOneSubSubItem(id: number): Promise<SubSubItemDto> {
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
  subSubItem.label=data.label;
  subSubItem.subItemId=data.subItemId;
  const saved = await this.subSubItemRepository.save(subSubItem);
  return this.toSubSubItemDto(saved);
}

async updateSubSubItem(id: number, data: CreateSubSubItemDto): Promise<SubSubItemDto> {
    const existing = await this.subSubItemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`SubSubItem with ID ${id} not found`);
  }
 existing.label=data.label;
 existing.subItemId=data.subItemId;
 var updatedData=await this.subSubItemRepository.save(existing);
  return this.toSubSubItemDto(updatedData);
}

  async deleteSubSubItem(id: number): Promise<void> {
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


  async findAllFields(): Promise<FieldDto[]> {
  const fields = await this.fieldRepository.find();
  return Promise.all(fields.map((field) => this.toFieldDto(field)));
}

async findOneField(id: number): Promise<FieldDto | null> {
  const field = await this.fieldRepository.findOne({
    where: { id }
  });

  return field ? this.toFieldDto(field) : null;
}

async createField(field: CreateFieldDto): Promise<FieldDto> {
  var newField=new Field();
  newField.name=field.name;
  newField.subSubItemId=field.subSubItemId;
  const data = await this.fieldRepository.save(newField);
  return await this.toFieldDto(data);
}

async updateField(id: number, updated: CreateFieldDto): Promise<FieldDto> {
  const existing = await this.fieldRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Field with ID ${id} not found`);
  }

 existing.name=updated.name;
 existing.subSubItemId=updated.subSubItemId;
  const saved = await this.fieldRepository.save(existing);
  return await this.toFieldDto(saved);
}


  async deleteField(id: number): Promise<void> {
    const result = await this.fieldRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
  }
  //subitem
   async findAllSubItems(): Promise<SubItem[]> {
  return this.subItemRepository.find();
}

async findOneSubItem(id: number): Promise<SubItem | null> {
  return this.subItemRepository.findOne({ where: { id } });
}

async createSubItem(subItem: CreateSubItemDto): Promise<SubItem> {
var newSubItem=new SubItem();
newSubItem.label=subItem.label;
newSubItem.itemId=subItem.itemId;
  return this.subItemRepository.save(newSubItem);
}

async updateSubItem(id: number, updated: CreateSubItemDto): Promise<SubItem> {
  const existing = await this.subItemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`SubItem with ID ${id} not found`);
  }
  existing.label=updated.label;
  existing.itemId=updated.itemId;
  return this.subItemRepository.save(existing);
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
    label: subItem.label,
    itemId: itemId, // Now guaranteed to be number
    item: itemDto,
  };
}





  async deleteSubItem(id: number): Promise<void> {
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



async findAllItems(): Promise<ItemDto[]> {
  const items = await this.itemRepository.find();
  return Promise.all(items.map(item => this.toItemDto(item)));
}

async findOneItem(id: number): Promise<ItemDto | null> {
  const item = await this.itemRepository.findOne({ where: { id } });
  return item ? await this.toItemDto(item) : null;
}

async createItem(item: CreateItemDto): Promise<ItemDto> {
  var newItem=new Item();
newItem.name=item.name;
newItem.menuId=item.menuId;
  const created = await this.itemRepository.save(newItem);
  return this.toItemDto(created);
}

async updateItem(id: number, updatedItem: CreateItemDto): Promise<ItemDto> {
  const existing = await this.itemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Item with ID ${id} not found`);
  }
  existing.menuId=updatedItem.menuId;
  existing.name=updatedItem.name;
  const saved = await this.itemRepository.save(existing);
  return this.toItemDto(saved);
}


  async deleteItem(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
//modules
  findAll(): Promise<Modules[]> {
    return this.modulesRepository.find();
  }

  async findOne(id: number): Promise<Modules> {
    const user = await this.modulesRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
 async update(id: number, moduleDto: Partial<Modules>): Promise<Modules> {
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

  async remove(id: number): Promise<void> {
    await this.modulesRepository.delete(id);
  }
   // ---------- APP METHODS ----------
   private async toDto(app: App): Promise<AppDto> {
  const module = await this.modulesRepository.findOne({
    where: { id: app.moduleId },
  });

  if (!module) {
    throw new Error(`Module with ID ${app.moduleId} not found`);
  }

  return {
    id: app.id,
    name: app.name,
    Module: module,
  };
}

  async findAllApps(): Promise<AppDto[]> {
    const apps = await this.appRepository.find(); // No need for relations
    const dtoPromises = apps.map(app => this.toDto(app));
    return await Promise.all(dtoPromises); // Wait for all async mapping
  }

  async findOneApp(id: number): Promise<AppDto | null> {
  const app = await this.appRepository.findOne({ where: { id } });
  return app ? await this.toDto(app) : null;
}


 async createApp(createAppDto: CreateAppDto): Promise<AppDto> {
    // const module = await this.modulesRepository.findOne({
    //   where: { id: createAppDto.moduleId },
    // });

    // if (!module) {
    //   throw new NotFoundException(`Module with ID ${createAppDto.moduleId} not found`);
    // }

    const app = this.appRepository.create({
      name: createAppDto.name,
      moduleId:createAppDto.moduleId,
    });

    const created = await this.appRepository.save(app);
    return this.toDto(created);
  }

  async updateApp(id: number, app: UpdateAppDto): Promise<AppDto> {
  const existing = await this.appRepository.preload({ id, ...app });

  if (!existing) {
    throw new NotFoundException(`App with ID ${id} not found`);
  }

  const updated = await this.appRepository.save(existing);
  return this.toDto(updated);
}

  async deleteApp(id: number): Promise<void> {
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


async findAllMenus(): Promise<MenuDto[]> {
  const menus = await this.menuRepository.find();

  if (menus.length === 0) {
    console.log("No menus found.");
    return [];
  }

  //console.log("First menu appId:", menus[0]?.appId); // use optional chaining for safety

  return Promise.all(menus.map(menu => this.toMenuDto(menu)));
}


async findOneMenu(id: number): Promise<MenuDto | null> {
  const menu = await this.menuRepository.findOne({
    where: { id },
  });
  return menu ? await this.toMenuDto(menu) : null;
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
  return await this.toMenuDto(saved);
}

async updateMenu(id: number, updateDto: CreateMenuDto): Promise<MenuDto> {
  // Find existing menu by id
  const existing = await this.menuRepository.findOne({
    where: { id },
  });

  if (!existing) {
    throw new NotFoundException(`Menu with ID ${id} not found`);
  }

  // Merge updated data into existing entity
  const merged = this.menuRepository.merge(existing, updateDto);

  // Save updated entity
  const saved = await this.menuRepository.save(merged);

  // Convert to DTO and return
  return await this.toMenuDto(saved);
}


  async deleteMenu(id: number): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

}
