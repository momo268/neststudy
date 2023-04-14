import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuserModule } from './auser/auser.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),// 这里注册configmodule来获取.env环境变量值（true设置为全局）
  TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "553",
    // "entities": [__dirname + "/**/*.entity{.ts.js}"], // 有autoLoadEntities，不需要
    "synchronize": true,  //代表是否自动将实体类同步到数据库（生产环境下不建议使用）
    "autoLoadEntities": true //自动加载实体，如果为true就不需要entities
  }), UserModule, AuserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
