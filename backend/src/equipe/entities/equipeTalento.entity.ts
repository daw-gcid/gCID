import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Equipe } from './equipe.entity';
import { Talento } from 'src/talento/entities/talento.entity';

@Entity('equipe_talento')
export class EquipeTalento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  cargo: string;

  @ManyToOne(() => Equipe, (equipe) => equipe.equipeTalentos, {
    onDelete: 'CASCADE',
  })
  equipe: Equipe;

  @ManyToOne(() => Talento, (talento) => talento.equipeTalentos, {
    onDelete: 'CASCADE',
  })
  talento: Talento;
}
