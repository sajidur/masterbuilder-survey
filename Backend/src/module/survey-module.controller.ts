/* eslint-disable prettier/prettier */
 
 
 
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {SurveyModuleService} from './survey-module.service';
import { Modules } from './module.entity/modules.entity';
import { App } from './module.entity/app.entity';
import { SubSubItem } from './module.entity/subsubitem.entity';
import { AppDto, CreateAppDto, UpdateAppDto } from './module.dto/App.dto';
import { CreateMenuDto, MenuDto } from './module.dto/menu.dto';
import { CreateItemDto, ItemDto } from './module.dto/item.dto';
import { CreateSubItemDto, SubItemDto } from './module.dto/subiItem.dto';
import { CreateSubSubItemDto, SubSubItemDto } from './module.dto/subSubItem.dto';
import { CreateFieldDto, FieldDto } from './module.dto/field.dto';
import { CreateModuleDto, UpdateModuleDto } from './module.dto/create-module.dto';
import { SubSubSubItemDto, CreateSubSubSubItemDto } from './module.dto/subsubsubitem.dto';
@ApiTags('survey-module')
@Controller('survey-module')
export class SurveyModuleController {


  constructor(private readonly moduleService: SurveyModuleService) {}
  //subitems
   @Get('allSubitems')
@ApiResponse({ status: 200, type: [SubItemDto] })
async findAllSubItems(): Promise<SubItemDto[]> {
  return await this.moduleService.findAllSubItems();
  //return Promise.all(subItems.map((s) => this.moduleService.toSubItemDto(s)));
}

@Get('getSubitem/:id')
@ApiResponse({ status: 200, type: SubItemDto })
@ApiParam({ name: 'id', type: String, description: 'SubItem ID' })
async findOneSubItem(@Param('id') id: string): Promise<SubItemDto> {
  return  await this.moduleService.findOneSubItem(id);
  // if (!subItem) throw new NotFoundException(`SubItem with ID ${id} not found`);
  // return this.moduleService.toSubItemDto(subItem);
}

@Post('addSubitems')
@ApiBody({ type: CreateSubItemDto })
@ApiResponse({ status: 201, type: SubItemDto })
async createSubItem(@Body() subItem: CreateSubItemDto,@Req() req: Request): Promise<SubItemDto> {
  const user=req['user'];
  return await this.moduleService.createSubItem(subItem,user);
  // console.log("subItem label "+created.name);
  // return this.moduleService.toSubItemDto(created);
}

@Put('updateSubitems/:id')
@ApiBody({ type:  CreateSubItemDto})
@ApiResponse({ status: 200, type: SubItemDto })
async updateSubItem(
  @Param('id') id: string,
  @Body() subItem: CreateSubItemDto,
  @Req() req: Request
): Promise<SubItemDto> {
  const user=req['user'];
  return  await this.moduleService.updateSubItem(id, subItem,user);
  // console.log("update subitem label "+updated.name);
  // return this.moduleService.toSubItemDto(updated);
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
create(@Body() moduleDto: CreateModuleDto,
 @Req() req: Request,
): Promise<Modules> {
  const user = req['user'];
  return this.moduleService.create(moduleDto,user);
}

@Put('updateModule/:id') // ✅ Corrected route
@ApiBody({ type: UpdateModuleDto }) // ✅ Use DTO
@ApiResponse({ status: 200, description: 'Module updated', type: Modules })
update(
  @Param('id') id: string,
  @Body() moduleDto: UpdateModuleDto,
  @Req() req: Request,
): Promise<Modules> {
  const user = req['user'];
  return this.moduleService.update(id, moduleDto,user);
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
createApp(@Body() app: CreateAppDto,
@Req() req: Request): Promise<AppDto|null> {
   const user = req['user'];
  return this.moduleService.createApp(app,user);
}

  @Put('updateApps/:id')
 
  @ApiBody({ type: App })
  @ApiResponse({ status: 200, type: AppDto })
  updateApp(@Param('id') id: string, @Body() app: UpdateAppDto,@Req() req: Request): Promise<AppDto|null> {
       const user = req['user'];
    return this.moduleService.updateApp(id, app,user);
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
createMenu(@Body() menuDto: CreateMenuDto,@Req() req: Request): Promise<MenuDto> {
   const user = req['user'];
  return this.moduleService.createMenu(menuDto,user);
}

@Put('updateMenu/:id')
@ApiBody({ type: CreateMenuDto })
@ApiResponse({ status: 200, type: MenuDto })
updateMenu(
  @Param('id') id: string,
  @Body() menuDto: CreateMenuDto,
  @Req() req: Request
): Promise<MenuDto> {
    const user = req['user'];
  return this.moduleService.updateMenu(id, menuDto,user);
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
createItem(@Body() item: CreateItemDto,
 @Req() req: Request): Promise<ItemDto> {
   const user = req['user'];
  return this.moduleService.createItem(item,user);
}

@Put('updateItem/:id')
@ApiBody({ type: CreateItemDto })
@ApiResponse({ status: 200, type: ItemDto })
updateItem(
  @Param('id') id: string,
  @Body() item: CreateItemDto,
  @Req() req: Request
): Promise<ItemDto> {
  const user = req['user'];
  return this.moduleService.updateItem(id, item,user);
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
async createField(@Body() field: CreateFieldDto,
 @Req() req: Request): Promise<FieldDto> {
  const user = req['user'];
  return this.moduleService.createField(field,user);
}

@Put('updateField/:id')
@ApiBody({ type: CreateFieldDto })
@ApiResponse({ status: 200, type: FieldDto })
async updateField(
  @Param('id') id: string,
  @Body() field: CreateFieldDto,
   @Req() req: Request
): Promise<FieldDto> {
   const user = req['user'];
  return this.moduleService.updateField(id, field,user);
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
async createSubSubItem(@Body() data: CreateSubSubItemDto,@Req() req: Request): Promise<SubSubItemDto> {
  const user=req['user'];
  return this.moduleService.createSubSubItem(data,user);
}

@Put('updateSubSubItem/:id')
@ApiBody({ type: SubSubItem })
@ApiResponse({ status: 200, type: SubSubItemDto })
async updateSubSubItem(
  @Param('id') id: string,
  @Body() data: SubSubItem,
  @Req() req: Request
): Promise<SubSubItemDto> {
  const user=req['user'];
  return this.moduleService.updateSubSubItem(id, data,user);
}



  @Delete('deleteSubSubItem:id')
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async deleteSubSubItem(@Param('id') id: string): Promise<void> {
    return this.moduleService.deleteSubSubItem(id);
  }
 @Get('getAllSubSubSubItems')
  @ApiResponse({ status: 200, type: [SubSubSubItemDto] })
  async findAllSubSubSubItems(): Promise<SubSubSubItemDto[]> {
    return this.moduleService.findAllSubSubSubItems();
  }

  @Get('SubSubSubItem:id')
  @ApiResponse({ status: 200, type: SubSubSubItemDto })
  async findOneSubSubSubItem(@Param('id') id: string): Promise<SubSubSubItemDto> {
    return this.moduleService.findOneSubSubSubItem(id);
  }

  @Post('addSubSubSubItem')
  @ApiBody({ type: CreateSubSubSubItemDto })
  @ApiResponse({ status: 201, type: SubSubSubItemDto })
  async createSubSubSubItem(
    @Body() dto: CreateSubSubSubItemDto,
    @Req() req: Request,
  ): Promise<SubSubSubItemDto> {
    const user = req['user'];
    return this.moduleService.createSubSubSubItem(dto, user);
  }

  @Put('updateSubSubSubItem/:id')
  @ApiBody({ type: CreateSubSubSubItemDto })
  @ApiResponse({ status: 200, type: SubSubSubItemDto })
  async updateSubSubSubItem(
    @Param('id') id: string,
    @Body() dto: CreateSubSubSubItemDto,
    @Req() req: Request,
  ): Promise<SubSubSubItemDto> {
    const user = req['user'];
    return this.moduleService.updateSubSubSubItem(id, dto, user);
  }

  @Delete('deleteSubSubSubItem/:id')
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async deleteSubSubSubItem(@Param('id') id: string): Promise<void> {
    return this.moduleService.deleteSubSubSubItem(id);
  }


}
