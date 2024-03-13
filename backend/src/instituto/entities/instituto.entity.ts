import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ length: 10, name: 'insttelefone' })
  telefone: string;

  @Column({ length: 60, name: 'instemail' })
  email: string;

  @Column({ length: 255, name: 'instdescricao' })
  descricao: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, name: 'intranking' })
  ranking: number;

  @OneToMany(() => Projeto, (projeto) => projeto.instituto, {
    nullable: true,
  })
  projetos: Projeto[];
}
