import { task_status} from "src/tareas/tareas.entity";
import { isEmpty, IsOptional, IsNotEmpty, IsIn, IsIBAN} from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}

export class UpdateTaskDTO {
    @IsOptional()
    title: string;
    @IsOptional()
    description: string;
    @IsOptional()
    @IsIn([task_status.pendinct, task_status.inprogrss, task_status.completed])
    status: task_status;    
}
