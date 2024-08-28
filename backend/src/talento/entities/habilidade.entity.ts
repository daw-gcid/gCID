import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Experiencia } from './experiencia.entity';

@Entity()
export class Habilidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'habnome' })
  nome: string;

  @Column({ type: 'int', name: 'habnivel' }) //coluna do nivel, 1 a 4 (1 - Básico, 2 - Intermediário, 3 - Avançado, 4 - Expert)
  nivel: number;

  @ManyToOne(() => Experiencia, (experiencia) => experiencia.habilidades)
  experiencia: Experiencia;
}
