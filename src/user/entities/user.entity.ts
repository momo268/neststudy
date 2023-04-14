import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;  //标记为主列，值为自动

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column('text')
  content: string;


  @Column({ default: "" })
  url: string;

  @Column('tinyint')
  type: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @CreateDateColumn({ type: 'timestamp' })
  undate_time: Date;

}
