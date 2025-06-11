/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DesignDefinitionController } from './design-definition.controller';
import { DesignDefinitionService } from './design-definition.service';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
//import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([
       DesignDefinition  
      ]),
    ],
  controllers: [DesignDefinitionController],
  providers: [DesignDefinitionService]
})
export class DesignDefinitionModule {}
