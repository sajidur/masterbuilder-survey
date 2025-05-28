import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'MYSQL8010.site4now.net',
      port: 3306,
      username: 'a66689_mukut',
      password: 'Root@pass1',
      database: 'db_a66689_mukut',
      autoLoadEntities: true,
      synchronize: true, // disable in production
    }),
    UserModule,
    FeatureModule,
  ],
})
export class AppModule {}
