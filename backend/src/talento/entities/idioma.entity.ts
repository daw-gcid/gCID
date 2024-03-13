import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Talento } from './talento.entity';

@Entity()
export class Idioma {
  // Idioma entity definition
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'idinome' })
  nome: string;

  @Column({ type: 'int', name: 'idinivel' }) //coluna do nivel, 1 a 4 (1 - Básico, 2 - Intermediário, 3 - Avançado, 4 - Expert)
  nivel: number;

  @ManyToOne(() => Talento, (talento) => talento.idiomas, {
    nullable: false,
  })
  talento: Talento;
}
