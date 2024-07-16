import { Projeto } from 'src/projeto/entities/projeto.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Instituto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 14, name: 'instcnpj' })
  cnpj: string;

  @Column({ length: 60, name: 'instnome' })
  nome: string;

  @Column({ length: 60, name: 'instendereco' })
  endereco: string;

  @Column({ length: 60, name: 'instcidade' })
  cidade: string;

  @Column({ length: 60, name: 'instestado' })
  estado: string;

  @Column({ length: 13, name: 'insttelefone' })
  telefone: string;

  @Column({ length: 60, name: 'instemail' })
  email: string;

  @Column({ length: 255, name: 'instdescricao', default: '' })
  descricao: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    name: 'intranking',
    default: 5.0,
  })
  ranking: number;

  @OneToMany(() => Projeto, (projeto) => projeto.instituto, {
    nullable: true,
  })
  projetos: Projeto[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
