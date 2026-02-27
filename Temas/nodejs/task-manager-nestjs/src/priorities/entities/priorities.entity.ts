import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity('priorities')
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Task, task => task.priority)
  tasks: Task[];
}
