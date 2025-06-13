"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const feature_module_1 = require("./feature/feature.module");
const survey_module_module_1 = require("./module/survey-module.module");
const survey_config_module_1 = require("./survey-config/survey-config.module");
const design_definition_module_1 = require("./design-definition/design-definition.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'MYSQL8010.site4now.net',
                port: 3306,
                username: 'a66689_mukut',
                password: 'Root@pass1',
                database: 'db_a66689_mukut',
                synchronize: false,
                autoLoadEntities: true,
                extra: {
                    connectionLimit: 100,
                },
            }),
            user_module_1.UserModule,
            feature_module_1.FeatureModule,
            design_definition_module_1.DesignDefinitionModule,
            survey_module_module_1.SurveyModuleModule,
            survey_config_module_1.SurveyConfigModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map