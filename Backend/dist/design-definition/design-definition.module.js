"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDefinitionModule = void 0;
const common_1 = require("@nestjs/common");
const design_definition_controller_1 = require("./design-definition.controller");
const design_definition_service_1 = require("./design-definition.service");
const design_definition_entity_1 = require("./design-defination.entity/design-definition.entity");
const typeorm_module_1 = require("@nestjs/typeorm/dist/typeorm.module");
const modules_entity_1 = require("../module/module.entity/modules.entity");
const field_entity_1 = require("../module/module.entity/field.entity");
const app_entity_1 = require("../module/module.entity/app.entity");
const item_entity_1 = require("../module/module.entity/item.entity");
const menu_entity_1 = require("../module/module.entity/menu.entity");
const subitem_entity_1 = require("../module/module.entity/subitem.entity");
const subsubitem_entity_1 = require("../module/module.entity/subsubitem.entity");
let DesignDefinitionModule = class DesignDefinitionModule {
};
exports.DesignDefinitionModule = DesignDefinitionModule;
exports.DesignDefinitionModule = DesignDefinitionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_module_1.TypeOrmModule.forFeature([
                design_definition_entity_1.DesignDefinition, modules_entity_1.Modules,
                app_entity_1.App, menu_entity_1.Menu, item_entity_1.Item, subitem_entity_1.SubItem, subsubitem_entity_1.SubSubItem, field_entity_1.Field
            ]),
        ],
        controllers: [design_definition_controller_1.DesignDefinitionController],
        providers: [design_definition_service_1.DesignDefinitionService]
    })
], DesignDefinitionModule);
//# sourceMappingURL=design-definition.module.js.map