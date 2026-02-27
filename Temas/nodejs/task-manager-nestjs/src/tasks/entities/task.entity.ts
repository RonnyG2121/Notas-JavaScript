import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Priority } from "../../priorities/entities/priorities.entity";


@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    state: boolean;
    @ManyToOne(() => Priority, (priority) => priority.tasks)
    priority: Priority;
    
}
