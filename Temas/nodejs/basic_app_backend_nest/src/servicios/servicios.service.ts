import { Injectable } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { EntidadTareas, task_status } from 'src/tareas/tareas.entity';

@Injectable()
export class TasksService {
  private entidad_tareas: EntidadTareas[] = [];
  getAllTasks(): EntidadTareas[] {
    return this.entidad_tareas;
  }

  CreateTasks(newTask: CreateTaskDTO): EntidadTareas {
    const task = {
      id: new Date().toISOString(),
      title: newTask.title,
      description: newTask.description,
      status: task_status.pendinct,
    };
    this.entidad_tareas.push(task);
    return task;
  }

  getTaskById(id: string): EntidadTareas {
    return this.entidad_tareas.find((task) => task.id === id);
  }

  updateTasks(id: string, updatedFields: UpdateTaskDTO): EntidadTareas{
    const task = this.getTaskById(id);
    const new_task = Object.assign(task, updatedFields);
    this.entidad_tareas = this.entidad_tareas.map((task) => task.id === id ? new_task : task);
    return new_task;
  }

  deleteTasks(id: string): void {
    this.entidad_tareas = this.entidad_tareas.filter((task) => task.id !== id);
  }
}
