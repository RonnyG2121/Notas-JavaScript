"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tareas_entity_1 = require("../tareas/tareas.entity");
let TasksService = class TasksService {
    constructor() {
        this.entidad_tareas = [];
    }
    getAllTasks() {
        return this.entidad_tareas;
    }
    CreateTasks(newTask) {
        const task = {
            id: new Date().toISOString(),
            title: newTask.title,
            description: newTask.description,
            status: tareas_entity_1.task_status.pendinct,
        };
        this.entidad_tareas.push(task);
        return task;
    }
    getTaskById(id) {
        return this.entidad_tareas.find((task) => task.id === id);
    }
    updateTasks(id, updatedFields) {
        const task = this.getTaskById(id);
        const new_task = Object.assign(task, updatedFields);
        this.entidad_tareas = this.entidad_tareas.map((task) => task.id === id ? new_task : task);
        return new_task;
    }
    deleteTasks(id) {
        this.entidad_tareas = this.entidad_tareas.filter((task) => task.id !== id);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=servicios.service.js.map