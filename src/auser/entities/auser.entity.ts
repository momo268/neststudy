import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer'

@Entity('auser')
export class Auser {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 255, comment: '用户名' })
  username: string

  @Exclude()
  @Column({ comment: "密码" })
  password: string


  @Column({ comment: "头像" })
  avatar: string

  @Column({ comment: "手机号" })
  phone: string;

  @Column('simple-enum', { enum: ['admin', 'user'], comment: '角色' })
  role: string;   // 用户角色

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间'
  })
  createTime: Date;

  @BeforeInsert() // 数据插入之前（这里是密码插入之前把密码进行加密）
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
