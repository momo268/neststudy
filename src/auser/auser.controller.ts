import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { AuserService } from './auser.service';
import { CreateAuserDto } from './dto/create-auser.dto';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';

@Controller('auser')
export class AuserController {
  constructor(private readonly auserService: AuserService) { }

  // 注册
  @Post('register')
  register(@Body() createAuser: CreateAuserDto) {
    return this.auserService.register(createAuser);
  }

  // 登录
  @UseInterceptors(ClassSerializerInterceptor) //返回参数不包含密码
  @Post('login')
  login(@Body() body: CreateAuserDto) {
    return this.auserService.login(body)
  }

  //获取信息
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('detail')
  getuser(@Query() query) {
    return this.auserService.getuser(query)
  }
}
