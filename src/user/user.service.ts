
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly user: Repository<UserEntity>) { }

  // 创建文章列表
  async create(createUserDto: CreateUserDto) {
    const { title, author} = createUserDto
    if (!title || !author) {
      throw new HttpException('参数错误', 300)
    }
    await this.user.save(createUserDto)
  }


  // 分页获取文章列表
  async findAll(query) {
    const { page = 1, pageSize = 10, ...reset } = query   // reset是搜索查询，根据传进来的参数查询相匹配的数据
    const where: Partial<UserEntity> = {}
    if ('title' in reset) {
      where.title = Like(`%${reset.title}%`) as unknown as string
    }
    if ('author' in reset) {
      where.author = Like(`%${reset.author}%`) as unknown as string
    }
    const data = await this.user.find({
      where, //查询条件
      order: {  // 排序方式，按照id排序
        id: 'ASC'
      },
      skip: (page - 1) * pageSize, // 跳过多少条查询
      take: pageSize  // 获取多少条
    })
    const total = await this.user.findAndCount({})
    if (data.length == 0) {
      throw new HttpException('没有找到匹配数据', 300)
    }
    return {
      data,
      total: total[1]
    }
  }



  // 更新文章
  async update(id, updateUserDto) {
    const exittitle = await this.user.findOne({ where: { id } })
    if (!exittitle) {
      throw new HttpException('文章不存在', 401)
    }
    return this.user.update(id, updateUserDto)
  }


  // 删除
  async remove(id) {
    const exittitle = await this.user.findOne({ where: { id } })
    if (!exittitle) {
      throw new HttpException('文章不存在', 401)
    }
    return this.user.delete(id)
  }
}
