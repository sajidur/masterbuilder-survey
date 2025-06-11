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
let DesignDefinitionModule = class DesignDefinitionModule {
};
exports.DesignDefinitionModule = DesignDefinitionModule;
exports.DesignDefinitionModule = DesignDefinitionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_module_1.TypeOrmModule.forFeature([
                design_definition_entity_1.DesignDefinition
            ]),
        ],
        controllers: [design_definition_controller_1.DesignDefinitionController],
        providers: [design_definition_service_1.DesignDefinitionService]
    })
], DesignDefinitionModule);
//# sourceMappingURL=design-definition.module.js.map