import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { TasksService } from 'src/servicios/servicios.service';
import { EntidadTareas } from 'src/tareas/tareas.entity';
export declare class RutasController {
    private tasks_service;
    constructor(tasks_service: TasksService);
    getAllTasks(): EntidadTareas[];
    createTask(newTask: CreateTaskDTO): EntidadTareas;
    DeleteTask(id: string): void;
    updateTask(id: string, updatedFields: UpdateTaskDTO): EntidadTareas;
}
