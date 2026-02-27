import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDto } from '../dto/task.dto';
import { TaskDtoPartial } from '../dto/task.dto.partial';
import { Tasks } from '../interfaces/tasks.interface';


// Esto es una clase que sirve de controlador para nuestra aplicación
// Recibe un decorador que dota de dicha función de decorador a la clase
// Este decorador recibe el nombre de la carpeta donde está nuestro archivo y así construye las rutas
@Controller('tasks')
export class TasksController {
    // Usaremos servicios para crear la lógica de negocio en la aplicación
    // Para ello, se instancia el objeto de la clase TaskService de manera privada y solo lectura dentro del constructor de esta clase TaskController, que por el momento irá vacío
    constructor(private readonly taskService: TasksService) { }
    // En los métodos se reciben decoradores y el primero es el que determina el método http como get, post etc
    // Estos reciben un parámetro que sirve para componer la ruta
    @Get('list-tasks')
    listTasks(){
        // Dentro de los métodos podemos manejar todo lo concerniente a dicha ruta definida arriba y retornar según sea conveniente
        // Normallmente se utiliza un servicio para llamarlo aquí y devolverlo. El servicio contiene la lógica de negocio o lo que hará la ruta, normalmente consulta la DB
        // Esto es lo que haremos luego de comentar lo que se hizo anteriormente para que quede como referencia
        // return "Lista de todas las tareas";
        // Lo que hace la siguiente instrucción es llamar al método que obtiene todas las tareas en el servicio, mismo que hará la consulta a la base de datos para obtener la lista de las tareas
        return this.taskService.getAllTasks();
    }

    // Creando una ruta con parámetro
    // Esta usa otro decorador dentro de los paréntesis de dicha función o método, llamado param para manejar los parámetros de la ruta
    // También usaremos un pipe, que no es más ue una clase que sirve para validar errores y transformar un dato de un tipo a otro
    // Suelen devolver promesas, razón por la cual el controlador que use el pipe debe convertirse en asíncrono
    @Get('list-task/:id')
    listTaskById(@Param('id', new ParseIntPipe()) id: number) {
        return this.taskService.getTaskById(id);
    }


    // Creando una ruta con varios parámetros y destructurándolos
    // Esto se logra con el decorador @Param() aplicándolo a cada parámetro y luego tipándolo
    @Get('find-task/:id/:prioryty')
    findTaskByIDAndByPrioryty(@Param('id') id: number, @Param('prioryty') prioryty: string) {
        return `Esta es la tarea con el id ${id} y la prioridad ${prioryty}`;

    }


    // Creando una ruta post, para insertar datos en el cuenrpo de la solicitud
    // Para esto, se usa el decorador body en los parámetros de la función, ya sea para destructurar o recibir un único parámetro
    // Otra cosa que usaremos es un dto, que no es másque un modelado que define los datos que esperamos del cliente
    // Es Una clase que establece las propiedades o campos que recibimos. Esto sirve para validarlos
    @Post('add-task')
    // Usaremos Un decorador que sirve para agregar pipes personalizados para las validaciones
    @UsePipes(new ValidationPipe())
    addTask(@Body() task: TaskDto) {
        return this.taskService.addTask(task);
    }


    // Añadiendo estados a las respuestas. Esto se hace con decoradores como httpcode y el enumerador httpStatus
    // Dentro de HttpCode, se puede pasar el número del estado o bien usar el enum de HttpStatus para mandar los diferentes estados como not found, no content etc
    @Post('addPriority')
    @HttpCode(201)
    addPriority(@Body() body) {
        return body;

    }

    // Mandar una respuesta u otra dependiendo
    // Para esto, se ppuede usar el decorador Res y validarlo con el enum HttpStatus
    @Get('filter-tasks')
    @HttpCode(200)
    filterTask(@Res() response, @Body() body) {
        if (!body) {
            return response.status(HttpStatus.NOT_FOUND).send('Tarea no encontrada');
        } else {
            return body;

        }
    }

    // Actualizar un contenido
    // Aquí también usaremos Pipes, pero con un errror personalizado que se pasa mediante un objeto
    @Put('update-task/:id')
    updateTask(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() task: TaskDto) {
        return this.taskService.updateTask(id, task);
    }

    /*     // Actualizando un contenido parcialmente
        @Patch('update-partial-task/:id')
        // También usaremos pipes personalizados para que manden un error concernientes a la ruta donde se llama
        @UsePipes(new ValidationPipe())
        async updateTaskPartial(@Param('id') id: number, @Body() taskDtoPartial): Promise<Tasks> {
            return this.taskService.updateTaskPartial(id, taskDtoPartial);
        } */

    // Eliminar un contenido
    @Delete('delete-task/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    }

    // Pasarle variables a la url. Esto se hace con el decorador @Query
    @Get('query')
    search(@Query() query) {
        return `Usted buscó ${JSON.stringify(query)}`;
    }

}