import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';  // Cas d'utilisation pour la suppression
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';  // Cas d'utilisation pour récupérer toutes les tâches
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';  // DTO de la tâche
import UseCaseFactory from '../UseCase/UseCaseFactory';
import CreateTaskUseCase from '../UseCase/CreateTask/CreateTaskUseCase';  // Cas d'utilisation pour la création d'une tâche
import { UpdateTaskUseCase } from 'src/UseCase/UpdateTask/UpdateTaskUseCase';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    // Appel du cas d'utilisation pour obtenir toutes les tâches
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // Crée un objet compatible avec ce que CreateTaskUseCase attend
    const createTaskUseCase = await this.useCaseFactory.create(CreateTaskUseCase);

    // Appel du cas d'utilisation pour créer la tâche
    const createdTask = await createTaskUseCase.handle(dto);  // Passe directement dto à handle

    return createdTask;  // Retourne la tâche créée
  }



  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    const updateTaskUseCase = await this.useCaseFactory.create(UpdateTaskUseCase);
    return updateTaskUseCase.handle(Number(id), dto);
  }
  
  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    // Appel du cas d'utilisation pour supprimer la tâche
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
