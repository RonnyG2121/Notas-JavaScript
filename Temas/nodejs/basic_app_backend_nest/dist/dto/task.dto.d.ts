import { task_status } from "src/tareas/tareas.entity";
export declare class CreateTaskDTO {
    title: string;
    description: string;
}
export declare class UpdateTaskDTO {
    title: string;
    description: string;
    status: task_status;
}
