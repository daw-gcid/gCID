import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, name: 'aranome' })
  nome: string;

  // Relacionamento muitos-para-muitos com Projeto
  @ManyToMany(() => Projeto, (projeto) => projeto.areas)
  projetos: Projeto[];
}