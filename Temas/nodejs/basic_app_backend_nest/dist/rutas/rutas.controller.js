"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutasController = void 0;
const common_1 = require("@nestjs/common");
const task_dto_1 = require("../dto/task.dto");
const servicios_service_1 = require("../servicios/servicios.service");
let RutasController = class RutasController {
    constructor(tasks_service) {
        this.tasks_service = tasks_service;
    }
    getAllTasks() {
        return this.tasks_service.getAllTasks();
    }
    createTask(newTask) {
        console.log(newTask);
        return this.tasks_service.CreateTasks(newTask);
    }
    DeleteTask(id) {
        return this.tasks_service.deleteTasks(id);
    }
    updateTask(id, updatedFields) {
        return this.tasks_service.updateTasks(id, updatedFields);
    }
};
exports.RutasController = RutasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], RutasController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDTO]),
    __metadata("design:returntype", void 0)
], RutasController.prototype, "createTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RutasController.prototype, "DeleteTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_dto_1.UpdateTaskDTO]),
    __metadata("design:returntype", void 0)
], RutasController.prototype, "updateTask", null);
exports.RutasController = RutasController = __decorate([
    (0, common_1.Controller)('tareas'),
    __metadata("design:paramtypes", [servicios_service_1.TasksService])
], RutasController);
//# sourceMappingURL=rutas.controller.js.map