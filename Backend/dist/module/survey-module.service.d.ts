import { Modules } from './module.entity/modules.entity';
import { Repository } from 'typeorm';
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
export declare class SurveyModuleService {
    private readonly modulesRepository;
    private readonly appRepository;
    private readonly menuRepository;
    private readonly itemRepository;
    private readonly subItemRepository;
    private readonly fieldRepository;
    private readonly subSubItemRepository;
    constructor(modulesRepository: Repository<Modules>, appRepository: Repository<App>, menuRepository: Repository<Menu>, itemRepository: Repository<Item>, subItemRepository: Repository<SubItem>, fieldRepository: Repository<Field>, subSubItemRepository: Repository<SubSubItem>);
    toSubSubItemDto(subSubItem: SubSubItem): Promise<SubSubItemDto>;
    private toSubSubItemDto1;
    findAllSubSubItem(): Promise<SubSubItemDto[]>;
    findOneSubSubItem(id: string): Promise<SubSubItemDto>;
    createSubSubItem(data: CreateSubSubItemDto): Promise<SubSubItemDto>;
    updateSubSubItem(id: string, data: CreateSubSubItemDto): Promise<SubSubItemDto>;
    deleteSubSubItem(id: string): Promise<void>;
    toFieldDto(field: Field): Promise<FieldDto>;
    toFieldDto1(field: Field, subSubItemMap: Map<string, SubSubItem>): Promise<FieldDto>;
    findAllFields(): Promise<FieldDto[]>;
    findOneField(id: string): Promise<FieldDto | null>;
    createField(field: CreateFieldDto): Promise<FieldDto>;
    updateField(id: string, updated: CreateFieldDto): Promise<FieldDto>;
    deleteField(id: string): Promise<void>;
    private toSubItemDto1;
    findAllSubItems(): Promise<SubItemDto[]>;
    findOneSubItem(id: string): Promise<SubItemDto>;
    createSubItem(subItem: CreateSubItemDto): Promise<SubItemDto>;
    updateSubItem(id: string, updated: CreateSubItemDto): Promise<SubItemDto>;
    toSubItemDto(subItem: SubItem): Promise<SubItemDto>;
    deleteSubItem(id: string): Promise<void>;
    private toItemDto;
    private toItemDto1;
    findAllItems(): Promise<ItemDto[]>;
    findOneItem(id: string): Promise<ItemDto | null>;
    createItem(item: CreateItemDto): Promise<ItemDto>;
    updateItem(id: string, updatedItem: CreateItemDto): Promise<ItemDto>;
    deleteItem(id: string): Promise<void>;
    findAll(): Promise<Modules[]>;
    findOne(id: string): Promise<Modules>;
    update(id: string, moduleDto: Partial<Modules>): Promise<Modules>;
    create(user: Partial<Modules>): Promise<Modules>;
    remove(id: string): Promise<void>;
    private toDto;
    findAllApps(): Promise<AppDto[]>;
    findOneApp(id: string): Promise<AppDto | null>;
    createApp(createAppDto: CreateAppDto): Promise<AppDto | null>;
    updateApp(id: string, app: UpdateAppDto): Promise<AppDto | null>;
    deleteApp(id: string): Promise<void>;
    private toMenuDto;
    private toMenuDto1;
    findAllMenus(): Promise<MenuDto[]>;
    findOneMenu(id: string): Promise<MenuDto>;
    createMenu(menuDto: CreateMenuDto): Promise<MenuDto>;
    updateMenu(id: string, updateDto: CreateMenuDto): Promise<MenuDto>;
    deleteMenu(id: string): Promise<void>;
}
