import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PrioritiesModule } from '../priorities/priorities.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule { }
