
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuserDto } from './dto/create-auser.dto';
import { Auser } from './entities/auser.entity';
import { compareSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuserService {
  constructor(
    @InjectRepository(Auser)
    private auser: Repository<Auser>,

    private jwtService: JwtService
  ) { }

  // 注册
  async register(createAuser: CreateAuserDto): Promise<any> {
    const { username, password } = createAuser
    if (!username || !password) {
      throw new HttpException('缺少用户名或密码', HttpStatus.BAD_REQUEST)
    }
    const exitUser = await this.auser.findOne({
      where: { username },
    });
    if (exitUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }
    const newUser = await this.auser.create(createAuser)  //这里要加一个create来创建一个新的实例才能走密码加密那一步
    await this.auser.save(newUser)
  }

  // 登录接口
  // 生成token
  async createToken(user: Auser) {
    const payload = {
      id: user.id,
      username: user.username
    }
    return this.jwtService.sign(payload)
  }
  async login(body: CreateAuserDto) {
    const { username, password } = body
    console.log(username, password);
    
    const data = await this.auser.findOne({
      where: { username }
    })
    // 校验
    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST)
    }
    if (!compareSync(password, data.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST)
    }
    const token = await this.createToken(data)
    return { data, token }
  }


  // 获取用户信息
  async getuser(query) {
    const { username } = query
    if (!username) {
      throw new HttpException('没有参数', HttpStatus.BAD_REQUEST)
    }
    const useinfo = await this.auser.findOne({
      where: { username }
    })
    if (!useinfo) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST)
    }
    return useinfo
  }

}
// 