import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { EntidadTareas } from 'src/tareas/tareas.entity';
export declare class TasksService {
    private entidad_tareas;
    getAllTasks(): EntidadTareas[];
    CreateTasks(newTask: CreateTaskDTO): EntidadTareas;
    getTaskById(id: string): EntidadTareas;
    updateTasks(id: string, updatedFields: UpdateTaskDTO): EntidadTareas;
    deleteTasks(id: string): void;
}
