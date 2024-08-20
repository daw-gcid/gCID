import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('proposta')
export class Proposta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Instituto, (instituto) => instituto.propostas, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  instituto: Instituto;

  @ManyToOne(() => Projeto, (projeto) => projeto.propostas, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  projeto: Projeto;

  @Column({ default: false, nullable: false })
  aceito: boolean;

  @Column({ default: 0 }) //0 - aguardando resposta, 1 - em negociação, 2 - aceita, 3 -rejeitada
  status: number;

  @Column()
  message: string;

  @Column()
  estimativaValor: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.propostas, { nullable: false })
  cliente: Cliente;

  @Column()
  remetente: string;

  @Column({ nullable: false })
  previsaoInicio: Date;

  @Column({ nullable: false })
  previsaoFim: Date;

  @CreateDateColumn()
  dataCriacao: Date;

  @DeleteDateColumn()
  dataExclusao: Date;
}
