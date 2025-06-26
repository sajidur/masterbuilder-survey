"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModuleModule = void 0;
const common_1 = require("@nestjs/common");
const survey_module_controller_1 = require("./survey-module.controller");
const survey_module_service_1 = require("./survey-module.service");
const typeorm_1 = require("@nestjs/typeorm");
const modules_entity_1 = require("./module.entity/modules.entity");
const app_entity_1 = require("./module.entity/app.entity");
const menu_entity_1 = require("./module.entity/menu.entity");
const item_entity_1 = require("./module.entity/item.entity");
const field_entity_1 = require("./module.entity/field.entity");
const subitem_entity_1 = require("./module.entity/subitem.entity");
const subsubitem_entity_1 = require("./module.entity/subsubitem.entity");
const auth_module_1 = require("../auth/auth.module");
const subSubSubItem_entity_1 = require("./module.entity/subSubSubItem.entity");
const template_1 = require("../Template/entity/template");
let SurveyModuleModule = class SurveyModuleModule {
};
exports.SurveyModuleModule = SurveyModuleModule;
exports.SurveyModuleModule = SurveyModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                template_1.Template,
                modules_entity_1.Modules,
                app_entity_1.App,
                menu_entity_1.Menu,
                item_entity_1.Item,
                subitem_entity_1.SubItem,
                subsubitem_entity_1.SubSubItem,
                subSubSubItem_entity_1.SubSubSubItem,
                field_entity_1.Field
            ]), auth_module_1.AuthModule
        ],
        providers: [survey_module_service_1.SurveyModuleService],
        controllers: [survey_module_controller_1.SurveyModuleController],
    })
], SurveyModuleModule);
//# sourceMappingURL=survey-module.module.js.map