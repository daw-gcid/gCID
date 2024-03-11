import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experiencia } from './experiencia.entity';
import { Idioma } from './idioma.entity';

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

  @Column({ length: 60, name: 'taldtinicio' })
  dtInicio: Date;

  @Column({ length: 60, name: 'taldtfim' })
  dtFim: Date;

  @Column({ length: 60, name: 'talemail' })
  email: string;

  @Column({ length: 10, name: 'taltelefone' })
  telefone: string;

  @Column({ length: 30, name: 'talnacionalidade' })
  nacionalidade: string;

  @Column({ length: 30, name: 'taldtnascimento' })
  dtNascimento: Date;

  @Column({ length: 30, name: 'talcidade' })
  cidade: string;

  @Column({ length: 30, name: 'talestado' })
  estado: string;

  @Column({ length: 255, nullable: true, name: 'talgithub' })
  github: string;

  @Column({ length: 255, nullable: true, name: 'tallinkedin' })
  linkedin: string;

  @OneToMany(() => Idioma, (idioma) => idioma.talento, {
    nullable: true,
  })
  idiomas: Idioma[];

  @OneToMany(() => Experiencia, (experiencia) => experiencia.talento, {
    nullable: true,
  })
  experiencias: Experiencia[];
}
