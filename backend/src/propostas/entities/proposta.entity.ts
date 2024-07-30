import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';

@Entity('proposta')
@Unique(['instituto', 'projeto'])
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

  @Column({ default: false })
  aceito: boolean;

  @Column({ type: 'uuid' })
  remetente: string;
}
