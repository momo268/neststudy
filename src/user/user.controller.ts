import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // 创建文章
  @ApiOperation({summary:'创建文章'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // 分页获取文章列表
  @ApiOperation({summary:'获取文章列表（包括分页）'})
  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }


  // 更新文章
  @ApiOperation({summary:'更新'})
  @Put(":id")
  updata(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }


  // 删除文章
  @ApiOperation({summary:'删除'})
  @Post('del')
  remove(@Body() body) {
    return this.userService.remove(body.id)
  }
}
