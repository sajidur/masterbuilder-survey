/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FeatureModule } from './feature/feature.module';
import { SurveyModuleModule } from './module/survey-module.module';

import { SurveyConfigModule } from './survey-config/survey-config.module';
import { DesignDefinitionModule } from './design-definition/design-definition.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'MYSQL8010.site4now.net',
      port: 3306,
      username: 'a66689_mukut',
      password: 'Root@pass1',
      database: 'db_a66689_mukut',

      synchronize: false, // disable in production
      autoLoadEntities: true,
      extra: {
        connectionLimit: 100, // ✅ Increase based on MySQL server's limit
      },
    }),
    UserModule,
    FeatureModule,
    DesignDefinitionModule,
    SurveyModuleModule,
    SurveyConfigModule,
  ],
})
export class AppModule {}
