import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Talento } from '../../talento/entities/talento.entity';
import { Instituto } from '../../instituto/entities/instituto.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { hashPasswordTransform } from 'src/common/helpers/crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ nullable: true, type: 'datetime' })
  emailVerified: Date;

  @Column({
    transformer: hashPasswordTransform,
  })
  password: string;

  @Column({ nullable: true, length: 255 })
  image: string;

  @Column({ type: 'int' }) // 1 - Talento, 2 - Instituto, 3 - Cliente
  userType: number;

  @OneToOne(() => Talento, { cascade: true })
  @JoinColumn()
  talento: Talento;

  @OneToOne(() => Instituto, { cascade: true })
  @JoinColumn()
  instituto: Instituto;

  @OneToOne(() => Cliente, { cascade: true })
  @JoinColumn()
  cliente: Cliente;
}
