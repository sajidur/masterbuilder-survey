/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SurveyModuleController } from '../survey-module/survey-module.controller';
import { SurveyModuleService } from '../survey-module/survey-module.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './survey-module.entity/modules.entity';
import { App } from '../survey-module/survey-module.entity/app.entity';
import { Menu } from '../survey-module/survey-module.entity/menu.entity';
import { Item } from '../survey-module/survey-module.entity/item.entity';
import { Field } from '../survey-module/survey-module.entity/field.entity';

import { SubItem } from '../survey-module/survey-module.entity/subitem.entity';
import { SubSubItem } from './survey-module.entity/subsubitem.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Modules,
      App, // ✅ This is likely what’s missing
      Menu,
      Item,
      SubItem,
      SubSubItem,
      Field
    ]),
  ],
  providers: [SurveyModuleService],
  controllers: [SurveyModuleController],

})
export class SurveyModuleModule {

}
