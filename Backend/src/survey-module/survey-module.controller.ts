/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
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
import { SubSubItem } from './survey-module.entity/subsubitem.entity';
import { AppDto } from './survey-module.dto/App.dto';
import { CreateMenuDto, MenuDto } from './survey-module.dto/menu.dto';
import { ItemDto } from './survey-module.dto/item.dto';
import { SubItemDto } from './survey-module.dto/subiItem.dto';
import { SubSubItemDto } from './survey-module.dto/subSubItem.dto';
import { FieldDto } from './survey-module.dto/field.dto';
import { CreateModuleDto, UpdateModuleDto } from './survey-module.dto/create-module.dto';
@ApiTags('survey-module')
@Controller('survey-module')
export class SurveyModuleController { 

  constructor(private readonly moduleService: SurveyModuleService) {}
  //subitems
   @Get('allSubitems')
@ApiResponse({ status: 200, type: [SubItemDto] })
async findAllSubItems(): Promise<SubItemDto[]> {
  const subItems = await this.moduleService.findAllSubItems();
  return Promise.all(subItems.map((s) => this.moduleService.toSubItemDto(s)));
}

@Get('getSubitem/:id')
@ApiResponse({ status: 200, type: SubItemDto })
@ApiParam({ name: 'id', type: Number, description: 'SubItem ID' })
async findOneSubItem(@Param('id', ParseIntPipe) id: number): Promise<SubItemDto> {
  const subItem = await this.moduleService.findOneSubItem(id);
  if (!subItem) throw new NotFoundException(`SubItem with ID ${id} not found`);
  return this.moduleService.toSubItemDto(subItem);
}

@Post('addSubitems')
@ApiBody({ type: SubItem })
@ApiResponse({ status: 201, type: SubItemDto })
async createSubItem(@Body() subItem: SubItem): Promise<SubItemDto> {
  const created = await this.moduleService.createSubItem(subItem);
  return this.moduleService.toSubItemDto(created);
}

@Put('updateSubitems/:id')
@ApiBody({ type: SubItem })
@ApiResponse({ status: 200, type: SubItemDto })
async updateSubItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() subItem: SubItem,
): Promise<SubItemDto> {
  const updated = await this.moduleService.updateSubItem(id, subItem);
  return this.moduleService.toSubItemDto(updated);
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
@ApiBody({ type: CreateModuleDto })
@ApiResponse({ status: 201, description: 'Module created', type: Modules })
create(@Body() moduleDto: CreateModuleDto): Promise<Modules> {
  return this.moduleService.create(moduleDto);
}

@Put('updateModule/:id') // ✅ Corrected route
@ApiBody({ type: UpdateModuleDto }) // ✅ Use DTO
@ApiResponse({ status: 200, description: 'Module updated', type: Modules })
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() moduleDto: UpdateModuleDto
): Promise<Modules> {
  return this.moduleService.update(id, moduleDto);
}

  @Delete('deleteModule:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduleService.remove(+id);
  }

   // ---------- APPS CRUD ----------
  @Get('allApps')
  
  @ApiResponse({ status: 200, type: [AppDto] })
  findAllApps(): Promise<AppDto[]> {
    return this.moduleService.findAllApps();
  }

  
 @Get('getApps/:id')
@ApiResponse({ status: 200, type: AppDto })

async findOneApp(@Param('id', ParseIntPipe) id: number): Promise<AppDto> {
  const app = await this.moduleService.findOneApp(id);
  if (!app) {
    throw new NotFoundException(`App with ID ${id} not found`);
  }
  return app;
}

  @Post('addApps')
  @ApiBody({ type: App })
  @ApiResponse({ status: 201, type: AppDto })
  createApp(@Body() app: App): Promise<AppDto> {
    return this.moduleService.createApp(app);
  }

  @Put('updateApps/:id')
 
  @ApiBody({ type: App })
  @ApiResponse({ status: 200, type: AppDto })
  updateApp(@Param('id', ParseIntPipe) id: number, @Body() app: App): Promise<AppDto> {
    return this.moduleService.updateApp(id, app);
  }

  @Delete('deleteApps/:id')
 
  @ApiResponse({ status: 204, description: 'App deleted' })
  deleteApp(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteApp(id);
  }
  //manu
  @Get('allMenus')
@ApiResponse({ status: 200, type: [MenuDto] })
findAllMenus(): Promise<MenuDto[]> {
  return this.moduleService.findAllMenus();
}

@Get('getMenu/:id')
@ApiResponse({ status: 200, type: MenuDto })
async findOneMenu(@Param('id', ParseIntPipe) id: number): Promise<MenuDto> {
  const menu = await this.moduleService.findOneMenu(id);
  if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);
  return menu;
}

@Post('addMenu')
@ApiBody({ type: CreateMenuDto })
@ApiResponse({ status: 201, type: MenuDto })
createMenu(@Body() menuDto: CreateMenuDto): Promise<MenuDto> {
  return this.moduleService.createMenu(menuDto);
}

@Put('updateMenu/:id')
@ApiBody({ type: CreateMenuDto })
@ApiResponse({ status: 200, type: MenuDto })
updateMenu(
  @Param('id', ParseIntPipe) id: number,
  @Body() menuDto: CreateMenuDto,
): Promise<MenuDto> {
  return this.moduleService.updateMenu(id, menuDto);
}


  @Delete('deleteMenu/:id')
  @ApiResponse({ status: 204, description: 'Menu deleted' })
  deleteMenu(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteMenu(id);
  }
  //item
 @Get('allItems')
@ApiResponse({ status: 200, type: [ItemDto] })
findAllItems(): Promise<ItemDto[]> {
  return this.moduleService.findAllItems();
}

@Get('getItem/:id')
@ApiResponse({ status: 200, type: ItemDto })
async findOneItem(@Param('id', ParseIntPipe) id: number): Promise<ItemDto> {
  const item = await this.moduleService.findOneItem(id);
  if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
  return item;
}

@Post('addItem') // fixed typo: was "addiItem"
@ApiBody({ type: Item })
@ApiResponse({ status: 201, type: ItemDto })
createItem(@Body() item: Item): Promise<ItemDto> {
  return this.moduleService.createItem(item);
}

@Put('updateItem/:id')
@ApiBody({ type: Item })
@ApiResponse({ status: 200, type: ItemDto })
updateItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() item: Item,
): Promise<ItemDto> {
  return this.moduleService.updateItem(id, item);
}

  @Delete('deleteItem/:id')
  @ApiResponse({ status: 204, description: 'Item deleted' })
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteItem(id);
  }
   // ---------- FIELD CRUD ----------
@Get('allFields')
@ApiResponse({ status: 200, type: [FieldDto] })
async findAllFields(): Promise<FieldDto[]> {
  return this.moduleService.findAllFields();
}

@Get('getField/:id')
@ApiResponse({ status: 200, type: FieldDto })
@ApiParam({ name: 'id', type: Number, description: 'Field ID' })
async findOneField(@Param('id', ParseIntPipe) id: number): Promise<FieldDto> {
  const field = await this.moduleService.findOneField(id);
  if (!field) throw new NotFoundException(`Field with ID ${id} not found`);
  return field;
}

@Post('addField')
@ApiBody({ type: Field }) // Or CreateFieldDto if defined
@ApiResponse({ status: 201, type: FieldDto })
async createField(@Body() field: Field): Promise<FieldDto> {
  return this.moduleService.createField(field);
}

@Put('updateField/:id')
@ApiBody({ type: Field })
@ApiResponse({ status: 200, type: FieldDto })
async updateField(
  @Param('id', ParseIntPipe) id: number,
  @Body() field: Field,
): Promise<FieldDto> {
  return this.moduleService.updateField(id, field);
}

  @Delete('deleteField/:id')
  @ApiResponse({ status: 204, description: 'Field deleted' })
  deleteField(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteField(id);
  }
  //subsubItem
 @Get('allSubSubItems')
@ApiResponse({ status: 200, type: [SubSubItemDto] })
async findAllSubSubItems(): Promise<SubSubItemDto[]> {
  return this.moduleService.findAllSubSubItem();
}

@Get('getSubSubItem/:id')
@ApiResponse({ status: 200, type: SubSubItemDto })
async findOneSubSubItem(@Param('id', ParseIntPipe) id: number): Promise<SubSubItemDto> {
  return this.moduleService.findOneSubSubItem(id);
}

@Post('addSubSubItem')
@ApiBody({ type: SubSubItem })
@ApiResponse({ status: 201, type: SubSubItemDto })
async createSubSubItem(@Body() data: SubSubItem): Promise<SubSubItemDto> {
  return this.moduleService.createSubSubItem(data);
}

@Put('updateSubSubItem/:id')
@ApiBody({ type: SubSubItem })
@ApiResponse({ status: 200, type: SubSubItemDto })
async updateSubSubItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: SubSubItem,
): Promise<SubSubItemDto> {
  return this.moduleService.updateSubSubItem(id, data);
}



  @Delete('deleteSubSubItem:id')
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async deleteSubSubItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moduleService.deleteSubSubItem(id);
  }

}
