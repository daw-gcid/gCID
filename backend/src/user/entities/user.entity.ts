import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from 'src/common/helpers/crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @Column({
    transformer: hashPasswordTransform,
  })
  password: string;

  @Column({ nullable: true, length: 255 })
  image: string;

  @Column({ type: 'int' }) // 1 client, 2 instituition, 3 talent
  userType: number;
}
