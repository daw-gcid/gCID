import { Area } from 'src/area/entities/area.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Proposta } from 'src/propostas/entities/proposta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjetoStatus {
  naoIniciado,
  emAndamento,
  concluido,
  cancelado,
}

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'projnome' })
  nome: string;

  @Column({ length: 255, name: 'projdescricao' })
  descricao: string;

  @Column({ name: 'projstatus', type: 'int', default: 0 })
  status: ProjetoStatus;

  @Column({ name: 'projdtfim', nullable: true })
  dtFim: Date;

  @CreateDateColumn({ name: 'projdtcadastro', nullable: true })
  dtCadastro: Date;

  @UpdateDateColumn({ name: 'projdtatualizacao', nullable: true })
  dtAtualizacao: Date;

  @Column({ name: 'projfeedback', nullable: true })
  feedback: string;

  @Column({ name: 'projdtfeedback', nullable: true })
  dtFeedback: Date;

  @Column()
  publico: boolean;

  @Column({nullable: true})
  estimativaValor: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.projetos, {
    nullable: false,
  })
  cliente: Cliente;

  // Relacionamento muitos-para-um com Instituto
  @ManyToOne(() => Instituto, (instituto) => instituto.projetos, {
    nullable: true,
  })
  instituto: Instituto;

  // Relacionamento muitos-para-muitos com Area
  @ManyToMany(() => Area, (area) => area.projetos)
  @JoinTable({ name: 'conhecimento_projeto' })
  areas: Area[];

  @OneToMany(() => Proposta, (proposta) => proposta.projeto)
  propostas: Proposta[];

  @Column({ name: 'projdtinicio', nullable: true })
  dtInicio: Date;
}
