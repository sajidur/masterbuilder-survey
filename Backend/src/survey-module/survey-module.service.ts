/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
@Injectable()
export class SurveyModuleService {
  constructor(
    @InjectRepository(Modules) private readonly modulesRepository: Repository<Modules>,
    @InjectRepository(App) private readonly appRepository: Repository<App>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(SubItem) private readonly subItemRepository: Repository<SubItem>,
    @InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
  ) {}
  //field
   async findAllFields(): Promise<Field[]> {
    return this.fieldRepository.find({ relations: ['subItem'] });
  }

  async findOneField(id: number): Promise<Field | null> {
    return this.fieldRepository.findOne({ where: { id }, relations: ['subItem'] });
  }

  async createField(field: Field): Promise<Field> {
    return this.fieldRepository.save(field);
  }

  async updateField(id: number, updated: Field): Promise<Field> {
    const existing = await this.fieldRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
    const merged = this.fieldRepository.merge(existing, updated);
    return this.fieldRepository.save(merged);
  }

  async deleteField(id: number): Promise<void> {
    const result = await this.fieldRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
  }
  //sunitem
    async findAllSubItems(): Promise<SubItem[]> {
    return this.subItemRepository.find({ relations: ['item', 'fields'] });
  }

  async findOneSubItem(id: number): Promise<SubItem | null> {
    return this.subItemRepository.findOne({ where: { id }, relations: ['item', 'fields'] });
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

  async deleteSubItem(id: number): Promise<void> {
    const result = await this.subItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubItem with ID ${id} not found`);
    }
  }
  //item
  async findAllItems(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['menu', 'subItems'] });
  }

  async findOneItem(id: number): Promise<Item | null> {
    return this.itemRepository.findOne({ where: { id }, relations: ['menu', 'subItems'] });
  }

  async createItem(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async updateItem(id: number, updatedItem: Item): Promise<Item> {
    const existing = await this.itemRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    const merged = this.itemRepository.merge(existing, updatedItem);
    return this.itemRepository.save(merged);
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
  async update(id: number, module: Modules): Promise<Modules> {
    await this.modulesRepository.update(id, module);
    return this.findOne(id);
  }
  create(user: Partial<Modules>): Promise<Modules> {
    return this.modulesRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.modulesRepository.delete(id);
  }
   // ---------- APP METHODS ----------
  async findAllApps(): Promise<App[]> {
    return await this.appRepository.find({ relations: ['module', 'menus'] });
  }

  async findOneApp(id: number): Promise<App | null> {
  return await this.appRepository.findOne({
    where: { id },
    relations: ['module', 'menus'],
  });
}


  async createApp(app: App): Promise<App> {
    return await this.appRepository.save(app);
  }

  async updateApp(id: number, app: App): Promise<App> {
    return await this.appRepository.save({ ...app, id });
  }

  async deleteApp(id: number): Promise<void> {
    await this.appRepository.delete(id);
  }

//manu 
 async findAllMenus(): Promise<Menu[]> {
    return this.menuRepository.find({ relations: ['app', 'items'] });
  }

  async findOneMenu(id: number): Promise<Menu | null> {
    return this.menuRepository.findOne({ where: { id }, relations: ['app', 'items'] });
  }

  async createMenu(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async updateMenu(id: number, updatedMenu: Menu): Promise<Menu> {
    const existing = await this.menuRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    const merged = this.menuRepository.merge(existing, updatedMenu);
    return this.menuRepository.save(merged);
  }

  async deleteMenu(id: number): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

}
