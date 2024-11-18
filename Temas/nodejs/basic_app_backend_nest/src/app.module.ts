import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { RutasController } from './rutas/rutas.controller';
import { TasksService } from './servicios/servicios.service';

@Module({
  imports: [TareasModule],
  controllers: [RutasController],
  providers: [TasksService],
})
export class AppModule {}
