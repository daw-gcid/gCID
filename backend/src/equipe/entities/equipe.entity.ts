import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { EquipeTalento } from './equipeTalento.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Entity()
export class Equipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'equnome' })
  nome: string;

  @Column({ length: 60, name: 'equinstituto' })
  instituto: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @OneToMany(() => EquipeTalento, (equipeTalento) => equipeTalento.equipe)
  equipeTalentos: EquipeTalento[];

  @ManyToOne(() => Projeto, (projeto) => projeto.equipes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  projeto: Projeto;
}
