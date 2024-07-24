import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, length: 14 })
  cnpj: string;

  @Column({ nullable: true, length: 255 })
  nome: string;

  @Column({ nullable: true, length: 256 })
  email: string;

  @Column({ nullable: true, length: 15 })
  telefone: string;

  @Column({ nullable: true, length: 100 })
  endereco: string;

  @OneToMany(() => Projeto, (projeto) => projeto.cliente, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  projetos: Projeto[];

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
