import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 14 })
  clicnpj: string;

  @Column({ nullable: true, length: 255 })
  clinome: string;

  @Column({ nullable: true, length: 256 })
  cliemail: string;

  @Column({ nullable: true, length: 10 })
  clitelefone: string;

  @Column({ nullable: true, length: 100 })
  cliendereco: string;

  // Outros campos específicos do Cliente, se houver

  @OneToOne(() => User, (user) => user.cliente)
  @JoinColumn()
  user: User;
}
