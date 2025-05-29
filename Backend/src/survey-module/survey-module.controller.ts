/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {SurveyModuleService} from './survey-module.service';
import { Modules } from './survey-module.entity/modules.entity';
import { App } from './survey-module.entity/app.entity';
import { Menu } from './survey-module.entity/menu.entity';
import { Item } from './survey-module.entity/item.entity';
import { SubItem } from './survey-module.entity/subitem.entity';
import { Field } from './survey-module.entity/field.entity';
@ApiTags('survey-module')
@Controller('survey-module')
export class SurveyModuleController {

  constructor(private readonly moduleService: SurveyModuleService) {}
  //subitems
    @Get('allSubitems')
  @ApiResponse({ status: 200, type: [SubItem] })
  findAllSubItems(): Promise<SubItem[]> {
    return this.moduleService.findAllSubItems();
  }

  @Get('getSubitem/:id')
  @ApiResponse({ status: 200, type: SubItem })
  @ApiParam({ name: 'id', type: Number, description: 'SubItem ID' })
  async findOneSubItem(@Param('id', ParseIntPipe) id: number): Promise<SubItem> {
    const subItem = await this.moduleService.findOneSubItem(id);
    if (!subItem) throw new NotFoundException(`SubItem with ID ${id} not found`);
    return subItem;
  }

  @Post('addSubitems')
  @ApiBody({ type: SubItem })
  @ApiResponse({ status: 201, type: SubItem })
  createSubItem(@Body() subItem: SubItem): Promise<SubItem> {
    return this.moduleService.createSubItem(subItem);
  }

  @Put('updateSubitems/:id')
  @ApiBody({ type: SubItem })
  @ApiResponse({ status: 200, type: SubItem })
  updateSubItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() subItem: SubItem,
  ): Promise<SubItem> {
    return this.moduleService.updateSubItem(id, subItem);
  }

  @Delete('deleteSubitems/:id')
  @ApiResponse({ status: 204, description: 'SubItem deleted' })
  deleteSubItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteSubItem(id);
  }
  //modules
@Get('allModules')
  findAll(): Promise<Modules[]> {
    return this.moduleService.findAll();
  }

  @Get('getModule:id')
  findOne(@Param('id') id: string): Promise<Modules> {
    return this.moduleService.findOne(+id);
  }


   @Post('addModule')
  @ApiBody({ type: Modules })
  @ApiResponse({ status: 201, description: 'Module created', type: Modules })
  create(@Body() module: Modules): Promise<Modules> {
    return this.moduleService.create(module);
  }
   @Put('updateModule:id')
  @ApiBody({ type: Modules })
  @ApiResponse({ status: 200, description: 'Module updated', type: Modules })
  update(@Param('id', ParseIntPipe) id: number, @Body() module: Modules): Promise<Modules> {
    return this.moduleService.update(id, module);
  }
  @Delete('deleteModule:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduleService.remove(+id);
  }

   // ---------- APPS CRUD ----------
  @Get('allApps')
  
  @ApiResponse({ status: 200, type: [App] })
  findAllApps(): Promise<App[]> {
    return this.moduleService.findAllApps();
  }

  
 @Get('getApps/:id')
@ApiResponse({ status: 200, type: App })

async findOneApp(@Param('id', ParseIntPipe) id: number): Promise<App> {
  const app = await this.moduleService.findOneApp(id);
  if (!app) {
    throw new NotFoundException(`App with ID ${id} not found`);
  }
  return app;
}

  @Post('addApps')
 
  @ApiBody({ type: App })
  @ApiResponse({ status: 201, type: App })
  createApp(@Body() app: App): Promise<App> {
    return this.moduleService.createApp(app);
  }

  @Put('updateApps/:id')
 
  @ApiBody({ type: App })
  @ApiResponse({ status: 200, type: App })
  updateApp(@Param('id', ParseIntPipe) id: number, @Body() app: App): Promise<App> {
    return this.moduleService.updateApp(id, app);
  }

  @Delete('deleteApps/:id')
 
  @ApiResponse({ status: 204, description: 'App deleted' })
  deleteApp(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteApp(id);
  }
  //manu
   @Get('allMenus')
  @ApiResponse({ status: 200, type: [Menu] })
  findAllMenus(): Promise<Menu[]> {
    return this.moduleService.findAllMenus();
  }

  @Get('getMenu/:id')
  @ApiResponse({ status: 200, type: Menu })

  async findOneMenu(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    const menu = await this.moduleService.findOneMenu(id);
    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);
    return menu;
  }

  @Post('addMenu')
  @ApiBody({ type: Menu })
  @ApiResponse({ status: 201, type: Menu })
  createMenu(@Body() menu: Menu): Promise<Menu> {
    return this.moduleService.createMenu(menu);
  }

  @Put('updateMenu/:id')
  @ApiBody({ type: Menu })
  @ApiResponse({ status: 200, type: Menu })
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: Menu,
  ): Promise<Menu> {
    return this.moduleService.updateMenu(id, menu);
  }

  @Delete('deleteMenu/:id')
  @ApiResponse({ status: 204, description: 'Menu deleted' })
  deleteMenu(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteMenu(id);
  }
  //item
   @Get('allItems')
  @ApiResponse({ status: 200, type: [Item] })
  findAllItems(): Promise<Item[]> {
    return this.moduleService.findAllItems();
  }

  @Get('getItem/:id')
  @ApiResponse({ status: 200, type: Item })
  async findOneItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    const item = await this.moduleService.findOneItem(id);
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }

  @Post('addiItem')
  @ApiBody({ type: Item })
  @ApiResponse({ status: 201, type: Item })
  createItem(@Body() item: Item): Promise<Item> {
    return this.moduleService.createItem(item);
  }

  @Put('updateItem/:id')
  @ApiBody({ type: Item })
  @ApiResponse({ status: 200, type: Item })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() item: Item,
  ): Promise<Item> {
    return this.moduleService.updateItem(id, item);
  }

  @Delete('deleteItem/:id')
  @ApiResponse({ status: 204, description: 'Item deleted' })
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteItem(id);
  }
   // ---------- FIELD CRUD ----------

  @Get('allFields')
  @ApiResponse({ status: 200, type: [Field] })
  findAllFields(): Promise<Field[]> {
    return this.moduleService.findAllFields();
  }

  @Get('getfField/:id')
  @ApiResponse({ status: 200, type: Field })
  @ApiParam({ name: 'id', type: Number, description: 'Field ID' })
  async findOneField(@Param('id', ParseIntPipe) id: number): Promise<Field> {
    const field = await this.moduleService.findOneField(id);
    if (!field) throw new NotFoundException(`Field with ID ${id} not found`);
    return field;
  }

  @Post('addField')
  @ApiBody({ type: Field })
  @ApiResponse({ status: 201, type: Field })
  createField(@Body() field: Field): Promise<Field> {
    return this.moduleService.createField(field);
  }

  @Put('updateField/:id')
  @ApiBody({ type: Field })
  @ApiResponse({ status: 200, type: Field })
  updateField(
    @Param('id', ParseIntPipe) id: number,
    @Body() field: Field,
  ): Promise<Field> {
    return this.moduleService.updateField(id, field);
  }

  @Delete('deleteField/:id')
  @ApiResponse({ status: 204, description: 'Field deleted' })
  deleteField(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteField(id);
  }
}
