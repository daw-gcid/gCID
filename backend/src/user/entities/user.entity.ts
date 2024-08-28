import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from 'src/common/helpers/crypto';
import { Talento } from 'src/talento/entities/talento.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

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

  @OneToOne(() => Talento, (talento) => talento.user, {
    // eager: true,
    nullable: true,
  })
  talento: Talento;

  @OneToOne(() => Instituto, (instituto) => instituto.user, {
    // eager: true,
    nullable: true,
  })
  instituto: Instituto;

  @OneToOne(() => Cliente, (cliente) => cliente.user, {
    // eager: true,
    nullable: true,
  })
  cliente: Cliente;
}
