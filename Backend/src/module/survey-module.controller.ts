/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {SurveyModuleService} from './survey-module.service';
import { Modules } from './module.entity/modules.entity';
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
import { CreateModuleDto, UpdateModuleDto } from './module.dto/create-module.dto';
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
@ApiParam({ name: 'id', type: String, description: 'SubItem ID' })
async findOneSubItem(@Param('id') id: string): Promise<SubItemDto> {
  const subItem = await this.moduleService.findOneSubItem(id);
  if (!subItem) throw new NotFoundException(`SubItem with ID ${id} not found`);
  return this.moduleService.toSubItemDto(subItem);
}

@Post('addSubitems')
@ApiBody({ type: CreateSubItemDto })
@ApiResponse({ status: 201, type: SubItemDto })
async createSubItem(@Body() subItem: CreateSubItemDto): Promise<SubItemDto> {
  const created = await this.moduleService.createSubItem(subItem);
  console.log("subItem label "+created.name);
  return this.moduleService.toSubItemDto(created);
}

@Put('updateSubitems/:id')
@ApiBody({ type:  CreateSubItemDto})
@ApiResponse({ status: 200, type: SubItemDto })
async updateSubItem(
  @Param('id') id: string,
  @Body() subItem: CreateSubItemDto,
): Promise<SubItemDto> {
  const updated = await this.moduleService.updateSubItem(id, subItem);
  console.log("update subitem label "+updated.name);
  return this.moduleService.toSubItemDto(updated);
}


  @Delete('deleteSubitems/:id')
  @ApiResponse({ status: 204, description: 'SubItem deleted' })
  deleteSubItem(@Param('id') id: string): Promise<void> {
    return this.moduleService.deleteSubItem(id);
  }
  //modules
@Get('allModules')
  findAll(): Promise<Modules[]> {
    return this.moduleService.findAll();
  }

  @Get('getModule:id')
  findOne(@Param('id') id: string): Promise<Modules> {
    return this.moduleService.findOne(id);
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
  @Param('id') id: string,
  @Body() moduleDto: UpdateModuleDto
): Promise<Modules> {
  return this.moduleService.update(id, moduleDto);
}

  @Delete('deleteModule:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduleService.remove(id);
  }

   // ---------- APPS CRUD ----------
  @Get('allApps')
  
  @ApiResponse({ status: 200, type: [AppDto] })
  findAllApps(): Promise<AppDto[]> {
    return this.moduleService.findAllApps();
  }

  
 @Get('getApps/:id')
@ApiResponse({ status: 200, type: AppDto })

async findOneApp(@Param('id') id: string): Promise<AppDto> {
  const app = await this.moduleService.findOneApp(id);
  if (!app) {
    throw new NotFoundException(`App with ID ${id} not found`);
  }
  return app;
}

  @Post('addApps')
@ApiBody({ type: CreateAppDto }) // Better to use CreateAppDto for input
@ApiResponse({ status: 201, type: AppDto })
createApp(@Body() app: CreateAppDto): Promise<AppDto> {
  return this.moduleService.createApp(app);
}

  @Put('updateApps/:id')
 
  @ApiBody({ type: App })
  @ApiResponse({ status: 200, type: AppDto })
  updateApp(@Param('id') id: string, @Body() app: UpdateAppDto): Promise<AppDto> {
    return this.moduleService.updateApp(id, app);
  }

  @Delete('deleteApps/:id')
 
  @ApiResponse({ status: 204, description: 'App deleted' })
  deleteApp(@Param('id') id: string): Promise<void> {
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
async findOneMenu(@Param('id') id: string): Promise<MenuDto> {
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
  @Param('id') id: string,
  @Body() menuDto: CreateMenuDto,
): Promise<MenuDto> {
  return this.moduleService.updateMenu(id, menuDto);
}


  @Delete('deleteMenu/:id')
  @ApiResponse({ status: 204, description: 'Menu deleted' })
  deleteMenu(@Param('id') id: string): Promise<void> {
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
async findOneItem(@Param('id') id: string): Promise<ItemDto> {
  const item = await this.moduleService.findOneItem(id);
  if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
  return item;
}

@Post('addItem') // fixed typo: was "addiItem"
@ApiBody({ type: CreateItemDto })
@ApiResponse({ status: 201, type: ItemDto })
createItem(@Body() item: CreateItemDto): Promise<ItemDto> {
  return this.moduleService.createItem(item);
}

@Put('updateItem/:id')
@ApiBody({ type: CreateItemDto })
@ApiResponse({ status: 200, type: ItemDto })
updateItem(
  @Param('id') id: string,
  @Body() item: CreateItemDto,
): Promise<ItemDto> {
  console.log(CreateAppDto.name);
  return this.moduleService.updateItem(id, item);
}

  @Delete('deleteItem/:id')
  @ApiResponse({ status: 204, description: 'Item deleted' })
  deleteItem(@Param('id') id: string): Promise<void> {
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
@ApiParam({ name: 'id', type: String, description: 'Field ID' })
async findOneField(@Param('id') id: string): Promise<FieldDto> {
  const field = await this.moduleService.findOneField(id);
  if (!field) throw new NotFoundException(`Field with ID ${id} not found`);
  return field;
}

@Post('addField')
@ApiBody({ type: CreateFieldDto }) // Or CreateFieldDto if defined
@ApiResponse({ status: 201, type: FieldDto })
async createField(@Body() field: CreateFieldDto): Promise<FieldDto> {
  return this.moduleService.createField(field);
}

@Put('updateField/:id')
@ApiBody({ type: CreateFieldDto })
@ApiResponse({ status: 200, type: FieldDto })
async updateField(
  @Param('id') id: string,
  @Body() field: CreateFieldDto,
): Promise<FieldDto> {
  return this.moduleService.updateField(id, field);
}

  @Delete('deleteField/:id')
  @ApiResponse({ status: 204, description: 'Field deleted' })
  deleteField(@Param('id') id: string): Promise<void> {
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
async findOneSubSubItem(@Param('id') id: string): Promise<SubSubItemDto> {
  return this.moduleService.findOneSubSubItem(id);
}

@Post('addSubSubItem')
@ApiBody({ type: CreateSubSubItemDto })
@ApiResponse({ status: 201, type: SubSubItemDto })
async createSubSubItem(@Body() data: CreateSubSubItemDto): Promise<SubSubItemDto> {
  return this.moduleService.createSubSubItem(data);
}

@Put('updateSubSubItem/:id')
@ApiBody({ type: SubSubItem })
@ApiResponse({ status: 200, type: SubSubItemDto })
async updateSubSubItem(
  @Param('id') id: string,
  @Body() data: SubSubItem,
): Promise<SubSubItemDto> {
  return this.moduleService.updateSubSubItem(id, data);
}



  @Delete('deleteSubSubItem:id')
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async deleteSubSubItem(@Param('id') id: string): Promise<void> {
    return this.moduleService.deleteSubSubItem(id);
  }

}
