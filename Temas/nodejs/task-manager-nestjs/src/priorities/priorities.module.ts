import { Module } from '@nestjs/common';
import { PrioritiesController } from './controllers/priorities.controller';
import { PrioritiesService } from './services/priorities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priorities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Priority])],
  controllers: [PrioritiesController],
  providers: [PrioritiesService]
})
export class PrioritiesModule {}
