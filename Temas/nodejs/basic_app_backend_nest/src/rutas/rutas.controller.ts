import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { TasksService } from 'src/servicios/servicios.service';
import { EntidadTareas } from 'src/tareas/tareas.entity';
// import { get } from 'http';

@Controller('tareas')
export class RutasController {
    constructor (private tasks_service: TasksService) {}
    @Get()
    getAllTasks(): EntidadTareas[] {
        return this.tasks_service.getAllTasks();
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDTO) {
        console.log(newTask);
        return this.tasks_service.CreateTasks(newTask);
    }

    @Delete(':id')
    @HttpCode(204)
    DeleteTask(@Param('id') id: string) {
        return this.tasks_service.deleteTasks(id);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDTO) {
        return this.tasks_service.updateTasks(id, updatedFields);
    }
}
