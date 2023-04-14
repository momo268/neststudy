// 入参（接口所需要的所有参数）
import { IsNotEmpty } from 'class-validator'

export class CreateAuserDto {
  @IsNotEmpty({ message: '缺少用户名' })
  readonly username: string
  @IsNotEmpty({ message: '缺少密码' })
  readonly password: string
}
