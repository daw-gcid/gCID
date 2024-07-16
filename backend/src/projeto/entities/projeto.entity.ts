import { Area } from 'src/area/entities/area.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum projetoStatus {
  naoIniciado = 0,
  emAndamento = 1,
  concluido = 2,
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
  status: projetoStatus;

  @Column({ name: 'projdtfim' })
  dtFim: Date;

  @CreateDateColumn({ name: 'projdtcadastro' })
  dtCadastro: Date;

  @UpdateDateColumn({ name: 'projdtatualizacao' })
  dtAtualizacao: Date;

  @Column({ name: 'projfeedback', nullable: true })
  feedback: string;

  @Column({ name: 'projdtfeedback', nullable: true })
  dtFeedback: Date;

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

  @Column({ name: 'projdtinicio' })
  dtInicio: Date;
}
