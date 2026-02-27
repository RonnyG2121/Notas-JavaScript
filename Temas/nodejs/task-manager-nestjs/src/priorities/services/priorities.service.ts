import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PriorityDto } from '../dto/priority.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority } from '../entities/priorities.entity';

@Injectable()
export class PrioritiesService {
    constructor(@InjectRepository(Priority) private priorityRepositori: Repository<Priority>) { }

    getAllPriorities() {
        return this.priorityRepositori.find();
    }

    async getPriorityById(id: number): Promise<Priority | null> {
        return this.priorityRepositori.findOneBy({ id });
    }

    async addPriority(priority: PriorityDto) {
        const objectPriority = this.priorityRepositori.create(priority);
        await this.priorityRepositori.save(objectPriority);
        return objectPriority;
    }

    async updatePriority(id: number, body: PriorityDto): Promise<Priority | null> {
        const objectPriority = {
            id,
            ...body
        };
        const priority = await this.priorityRepositori.preload(objectPriority);
        if (!priority) {
            throw new NotFoundException(`No se encuentra la prioridad con el id ${id}`);
        } else {
            return await this.priorityRepositori.save(priority);
        }
    }

    async deletePriority(id: number) {
        const priority = await this.priorityRepositori.findOneBy({ id: id });
        if (!priority) {
            throw new HttpException(`La prioridad con el id ${id} no se encontró`, HttpStatus.NOT_FOUND);
        } else {
            return await this.priorityRepositori.remove(priority);
        }
    }
}
