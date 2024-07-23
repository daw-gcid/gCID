import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Experiencia } from './experiencia.entity';
import { Idioma } from './idioma.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Talento {
  // Talento entity definition
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'talnome' })
  nome: string;

  @Column({ length: 60, name: 'talinstituicao' })
  instituicao: string;

  @Column({ length: 60, name: 'talcurso' })
  curso: string;

  @Column({ name: 'taldtinicio' })
  dtInicio: Date;

  @Column({ name: 'taldtfim' })
  dtFim: Date;

  @Column({ length: 60, name: 'talemail' })
  email: string;

  @Column({ length: 13, name: 'taltelefone' })
  telefone: string;

  @Column({ length: 30, name: 'talnacionalidade' })
  nacionalidade: string;

  @Column({ name: 'taldtnascimento' })
  dtNascimento: Date;

  @Column({ length: 30, name: 'talcidade' })
  cidade: string;

  @Column({ length: 30, name: 'talestado' })
  estado: string;

  @Column({ length: 255, nullable: true, name: 'talgithub' })
  github: string;

  @Column({ length: 255, nullable: true, name: 'tallinkedin' })
  linkedin: string;

  @Column({ length: 255, name: 'talpathmatricula' })
  pathMatricula: string;

  @Column({ length: 255, name: 'talpathhistorico' })
  pathHistorico: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'talranking',
    default: 5,
  })
  ranking: number;

  @Column({ type: 'float', precision: 5, scale: 2, name: 'talcoeficiente' })
  coeficiente: number;

  @OneToMany(() => Idioma, (idioma) => idioma.talento, {
    nullable: true,
  })
  idiomas: Idioma[];

  @OneToMany(() => Experiencia, (experiencia) => experiencia.talento, {
    nullable: true,
  })
  experiencias: Experiencia[];

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
