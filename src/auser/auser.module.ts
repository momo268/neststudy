import { Module } from '@nestjs/common';
import { AuserService } from './auser.service';
import { AuserController } from './auser.controller';
import { Auser } from './entities/auser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy';


// 这里不建议将秘钥写死在代码也， 它应该和数据库配置的数据一样，从环境变量中来
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (ConfigService: ConfigService) => {
    return {
      secret: ConfigService.get('SECRET'),
      signOptions: { expiresIn: '8h' }
    }
  }
})

@Module({
  imports: [TypeOrmModule.forFeature([Auser]), jwtModule],
  controllers: [AuserController],
  providers: [JwtStrategy,AuserService],
})
export class AuserModule { }
