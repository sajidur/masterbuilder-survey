/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Modules } from './survey-module.entity/modules.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './survey-module.entity/app.entity';
import { Menu } from './survey-module.entity/menu.entity';
import { Item } from './survey-module.entity/item.entity';
import { SubItem } from './survey-module.entity/subitem.entity';
import { Field } from './survey-module.entity/field.entity';
import { SubSubItem } from './survey-module.entity/subsubitem.entity';
import { AppDto, CreateAppDto, UpdateAppDto } from './survey-module.dto/App.dto';
import { CreateMenuDto, MenuDto } from './survey-module.dto/menu.dto';
import { ItemDto } from './survey-module.dto/item.dto';
import { SubItemDto } from './survey-module.dto/subiItem.dto';
import { SubSubItemDto } from './survey-module.dto/subSubItem.dto';
import { FieldDto } from './survey-module.dto/field.dto';
import { Module } from '@nestjs/core/injector/module';
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

  if (subSubItem.subItem) {
    // Use the toSubItemDto method here
    subItemDto = await this.toSubItemDto(subSubItem.subItem);
  } else if (subSubItem.subItemId) {
    const subItem = await this.subItemRepository.findOne({
      where: { id: subSubItem.subItemId },
      relations: ['item', 'item.menu', 'item.menu.app', 'item.menu.app.module'], // Ensure all nested relations loaded
    });
    if (subItem) {
      subItemDto = await this.toSubItemDto(subItem);
    }
  }

  return {
    id: subSubItem.id,
    label: subSubItem.label,
    subItemId: subSubItem.subItemId?.toString() || '',
    subItem: subItemDto,
  };
}



 async findAllSubSubItem(): Promise<SubSubItemDto[]> {
  const items = await this.subSubItemRepository.find({ relations: ['subItem'] });
  return Promise.all(items.map(item => this.toSubSubItemDto(item)));
}

async findOneSubSubItem(id: number): Promise<SubSubItemDto> {
  const item = await this.subSubItemRepository.findOne({
    where: { id },
    relations: ['subItem'],
  });
  if (!item) {
    throw new NotFoundException(`SubSubItem with ID ${id} not found`);
  }
  return this.toSubSubItemDto(item);
}

async createSubSubItem(data: SubSubItem): Promise<SubSubItemDto> {
  const created = this.subSubItemRepository.create(data);
  const saved = await this.subSubItemRepository.save(created);
  return this.toSubSubItemDto(saved);
}

async updateSubSubItem(id: number, data: SubSubItem): Promise<SubSubItemDto> {
  await this.findOneSubSubItem(id); // throws if not found
  await this.subSubItemRepository.update(id, data);
  const updated = await this.subSubItemRepository.findOne({
    where: { id },
    relations: ['subItem'],
  });
  return this.toSubSubItemDto(updated!);
}

  async deleteSubSubItem(id: number): Promise<void> {
    const result = await this.subSubItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubSubItem with ID ${id} not found`);
    }
  }
  //field
  async toFieldDto(field: Field): Promise<FieldDto> {
  const subSubItem = field.subSubItem;

  const subSubItemDto: SubSubItemDto | null = subSubItem
    ? {
        id: subSubItem.id,
        label: subSubItem.label,
        subItemId: subSubItem.subItemId?.toString() || '',
        subItem: subSubItem.subItem
          ? await this.toSubItemDto(subSubItem.subItem)
          : null,
      }
    : null;

  return {
    id: field.id,
    name: field.name,
    subSubItemId: field.subSubItemId,
    subSubItem: subSubItemDto,
  };
}


  async findAllFields(): Promise<FieldDto[]> {
  const fields = await this.fieldRepository.find({
    relations: [
      'subSubItem',
      'subSubItem.subItem',
      'subSubItem.subItem.item',
      'subSubItem.subItem.item.menu',
      'subSubItem.subItem.item.menu.app',
      'subSubItem.subItem.item.menu.app.module',
    ],
  });

  return Promise.all(fields.map((field) => this.toFieldDto(field)));
}

async findOneField(id: number): Promise<FieldDto | null> {
  const field = await this.fieldRepository.findOne({
    where: { id },
    relations: [
      'subSubItem',
      'subSubItem.subItem',
      'subSubItem.subItem.item',
      'subSubItem.subItem.item.menu',
      'subSubItem.subItem.item.menu.app',
      'subSubItem.subItem.item.menu.app.module',
    ],
  });

  return field ? this.toFieldDto(field) : null;
}

async createField(field: Field): Promise<FieldDto> {
  const created = await this.fieldRepository.save(field);
  return this.findOneField(created.id) as Promise<FieldDto>;
}

async updateField(id: number, updated: Field): Promise<FieldDto> {
  const existing = await this.fieldRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Field with ID ${id} not found`);
  }

  const merged = this.fieldRepository.merge(existing, updated);
  const saved = await this.fieldRepository.save(merged);
  return this.findOneField(saved.id) as Promise<FieldDto>;
}


  async deleteField(id: number): Promise<void> {
    const result = await this.fieldRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
  }
  //subitem
   async findAllSubItems(): Promise<SubItem[]> {
  return this.subItemRepository.find({ relations: ['item'] });
}

async findOneSubItem(id: number): Promise<SubItem | null> {
  return this.subItemRepository.findOne({ where: { id }, relations: ['item'] });
}

async createSubItem(subItem: SubItem): Promise<SubItem> {
  return this.subItemRepository.save(subItem);
}

async updateSubItem(id: number, updated: SubItem): Promise<SubItem> {
  const existing = await this.subItemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`SubItem with ID ${id} not found`);
  }
  const merged = this.subItemRepository.merge(existing, updated);
  return this.subItemRepository.save(merged);
}

// Helper to convert SubItem -> SubItemDto
async toSubItemDto(subItem: SubItem): Promise<SubItemDto> {
  let itemDto: ItemDto | null = null;

  if (subItem.item) {
    const item = subItem.item;
    itemDto = {
      id: item.id,
      name: item.name,
      menu: item.menu
        ? {
            id: item.menu.id,
            title: item.menu.title,
            app: item.menu.app
              ? {
                  id: item.menu.app.id,
                  name: item.menu.app.name,
                  Module: item.menu.app.module ?? null,  // ensure Module is present
                }
              : null,
          }
        : null,
    };
  } else if (subItem.itemId) {
    const item = await this.itemRepository.findOne({
      where: { id: subItem.itemId },
      relations: ['menu', 'menu.app', 'menu.app.module'], // load module relation too
    });
    if (item) {
      itemDto = {
        id: item.id,
        name: item.name,
        menu: item.menu
          ? {
              id: item.menu.id,
              title: item.menu.title,
              app: item.menu.app
                ? {
                    id: item.menu.app.id,
                    name: item.menu.app.name,
                    Module: item.menu.app.module ?? null,
                  }
                : null,
            }
          : null,
      };
    }
  }

  return {
    id: subItem.id,
    label: subItem.label,
    itemId: subItem.itemId?.toString() || '',
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
    where: { id: item.menuId },
    relations: ['app'],
  });

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

async createItem(item: Item): Promise<ItemDto> {
  const created = await this.itemRepository.save(item);
  return this.toItemDto(created);
}

async updateItem(id: number, updatedItem: Item): Promise<ItemDto> {
  const existing = await this.itemRepository.findOneBy({ id });
  if (!existing) {
    throw new NotFoundException(`Item with ID ${id} not found`);
  }
  const merged = this.itemRepository.merge(existing, updatedItem);
  const saved = await this.itemRepository.save(merged);
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
    ? await this.appRepository.findOne({
        where: { id: menu.appId },
      })
    : null;

  let module: Modules | null = null;
  if (app?.moduleId) {
    module = await this.modulesRepository.findOne({
      where: { id: app.moduleId },
    });
  }

  const appDto: AppDto | null = app
    ? {
        id: app.id,
        name: app.name,
        Module: module
          ? {
              id: module.id,
              name: module.name,
            }
          : null,
      }
    : null;

  const menuDto: MenuDto = {
    id: menu.id,
    title: menu.title,
    app: appDto,
  };

  return menuDto;
}


async findAllMenus(): Promise<MenuDto[]> {
  const menus = await this.menuRepository.find({ relations: ['app'] });
  return Promise.all(menus.map(menu => this.toMenuDto(menu)));
}

async findOneMenu(id: number): Promise<MenuDto | null> {
  const menu = await this.menuRepository.findOne({
    where: { id },
    relations: ['app'],
  });
  return menu ? await this.toMenuDto(menu) : null;
}

async createMenu(menuDto: CreateMenuDto): Promise<MenuDto> {
  const created = this.menuRepository.create(menuDto);
  const saved = await this.menuRepository.save(created);
  const completeMenu = await this.menuRepository.findOne({
    where: { id: saved.id },
    relations: ['app'],
  });
  return await this.toMenuDto(completeMenu!);
}

async updateMenu(id: number, updateDto: CreateMenuDto): Promise<MenuDto> {
  const existing = await this.menuRepository.findOne({
    where: { id },
    relations: ['app'],
  });

  if (!existing) {
    throw new NotFoundException(`Menu with ID ${id} not found`);
  }

  const merged = this.menuRepository.merge(existing, updateDto);
  const saved = await this.menuRepository.save(merged);

  return await this.toMenuDto(saved);
}


  async deleteMenu(id: number): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

}
