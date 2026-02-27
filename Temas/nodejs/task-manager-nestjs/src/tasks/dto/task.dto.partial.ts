import { PartialType } from '@nestjs/mapped-types';
import { TaskDto } from './task.dto';

// Este dto es para aplicárselo a las rutas con el método patch usando PartialType de nest
export class  TaskDtoPartial extends PartialType(TaskDto) {

}