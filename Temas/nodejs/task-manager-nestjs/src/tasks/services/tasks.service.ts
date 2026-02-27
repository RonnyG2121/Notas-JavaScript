import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from '../dto/task.dto';
import { TaskDtoPartial } from '../dto/task.dto.partial';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';


// Esto es un servicio
// Es una clase que sirve para manejar la lógica de negocio de la aplicación, es decir, todas las comprobaciiones que tienen que ver con nuestra aplicación
// Consultas a la base de datos, validaciones si un recurso existe etc.
// Esto utiliza la inllección de dependencias y se llama en el controller

@Injectable()
export class TasksService {
    // Aquí haremos uso de algo llamado repositories, que no es más que una clase que nos permitirá acceder a los métodos de nuestra entidad para hacer consultas a la DB
    // Aquí llamamos al constructor de la clase del servicio y dentro usamos la llamada al repositorio con un decorador, y declaramos una variable privada que sea del tipo genérico de nuestro repositorio
    constructor(@InjectRepository(Task) private taskRepositori: Repository<Task>) { }

    // El siguiente método, se llama desde el controlador. Aquí se hacen todas las comrobaciones y el controlador queda con un código más reducido
    getAllTasks() {
        // Nota: El método del controlador que use un método de un servicio, puede devolver lo mismo que devuelve el método en el servicio de ser necesario. En este caso, devuelve la interface que implementa una lista de tareas
        return this.taskRepositori.find();
    }

    // Obtener una tarea por su id
    async getTaskById(id: number): Promise<Task | null> {
        return this.taskRepositori.findOneBy({id});
    }

    // lógica para insertar una tarea
    async addTask(task: TaskDto) {
        const objectTask = this.taskRepositori.create(task);
        await this.taskRepositori.save(objectTask);
        return objectTask;
    }

    // Actualizando el contenido de una tarea
    async updateTask(id: number, body: TaskDto): Promise<Task | null> {
        const objectTask = {
            id,
            ...body
        };
        const task = await this.taskRepositori.preload(objectTask);
        if (!task) {
            throw new NotFoundException(`No se encuentra la tarea con el id ${id}`);

        } else {
            return await this.taskRepositori.save(task);
        }

    }

    // Actualizar un contenido parcialmente
/*     updateTaskPartial(id: number, taskDtoPartial: TaskDtoPartial) {
        let previewsTask = this.getTaskById(id);
        let task: Tasks = {
            ...previewsTask,
            ...taskDtoPartial
        };
        this.tasks = this.tasks.map((item: Tasks) => {
            console.log(item, id, item.id == id);
            return item.id == id ? task : item;
        });
        return task;
    }
 */

    // Eliminar una tarea
    async deleteTask(id: number) {
        const task = await this.taskRepositori.findOneBy({id: id});
        if (!task) {
            throw new HttpException(`La tarea con el id ${id} no se encontró`, HttpStatus.NOT_FOUND);
        } else {
            return await this.taskRepositori.remove(task);
        }
        }
    
/*     // Método para agregar un id superior al último id de una tarea
    addId(): number {
        return this.tasks[this.tasks.length - 1].id;
    }
 */
}