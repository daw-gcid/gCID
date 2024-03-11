import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Talento } from './talento.entity';
import { Habilidade } from './habilidade.entity';

export class Experiencia {
  // Experiencia entity definition
  //relação com talento
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'exptitulo' })
  titulo: string;

  @Column({ length: 60, name: 'expinstituicao' })
  instituicao: string;

  @Column({ length: 60, name: 'expdtinicio' })
  dtInicio: Date;

  @Column({ length: 60, name: 'expdtfim' })
  dtFim: Date;

  @Column({ length: 60, name: 'expdescricao' })
  descricao: string;

  @ManyToOne(() => Talento, (talento) => talento.experiencias)
  talento: Talento;

  @OneToMany(() => Habilidade, (habilidade) => habilidade.experiencia)
  habilidades: Habilidade[];
}
