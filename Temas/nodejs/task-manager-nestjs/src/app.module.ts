import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TasksModule,
    PrioritiesModule,
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root1234",
      database: "nestjs_db",
      retryDelay: 5000,
      autoLoadEntities: true,
      synchronize: true
    })],
    
})
export class AppModule {}
