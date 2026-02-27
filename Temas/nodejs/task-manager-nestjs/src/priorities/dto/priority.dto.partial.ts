import { PartialType } from '@nestjs/mapped-types';
import { PriorityDto } from './priority.dto';

// Este dto es para aplicárselo a las rutas con el método patch usando PartialType de nest
export class  PriorityDtoPartial extends PartialType(PriorityDto) {

}