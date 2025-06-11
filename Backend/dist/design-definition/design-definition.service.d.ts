import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
export declare class DesignDefinitionService {
    private readonly designDefRepo;
    private readonly subSubItemRepo;
    constructor(designDefRepo: Repository<DesignDefinition>, subSubItemRepo: Repository<SubSubItem>);
    create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto>;
    findAll(): Promise<DesignDefinitionResponseDto[]>;
    findOne(id: number): Promise<DesignDefinitionResponseDto>;
    update(id: number, dto: Partial<CreateDesignDefinitionDto>): Promise<DesignDefinitionResponseDto>;
    remove(id: number): Promise<void>;
}
