import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
import { App } from 'src/module/module.entity/app.entity';
import { Field } from 'src/module/module.entity/field.entity';
import { Item } from 'src/module/module.entity/item.entity';
import { Menu } from 'src/module/module.entity/menu.entity';
import { Modules } from 'src/module/module.entity/modules.entity';
import { SubItem } from 'src/module/module.entity/subitem.entity';
export declare class DesignDefinitionService {
    private readonly designDefRepo;
    private readonly modulesRepository;
    private readonly appRepository;
    private readonly menuRepository;
    private readonly itemRepository;
    private readonly subItemRepository;
    private readonly fieldRepository;
    private readonly subSubItemRepository;
    constructor(designDefRepo: Repository<DesignDefinition>, modulesRepository: Repository<Modules>, appRepository: Repository<App>, menuRepository: Repository<Menu>, itemRepository: Repository<Item>, subItemRepository: Repository<SubItem>, fieldRepository: Repository<Field>, subSubItemRepository: Repository<SubSubItem>);
    findByContentTypeIdAndName(contentTypeId: string, contentTypeName: string): Promise<{
        source: string;
        data: any;
    }>;
    create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto>;
    findAll(): Promise<DesignDefinitionResponseDto[]>;
    findOne(id: string): Promise<DesignDefinitionResponseDto>;
    update(id: string, dto: Partial<CreateDesignDefinitionDto>): Promise<DesignDefinitionResponseDto>;
    remove(id: string): Promise<void>;
}
