import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';  
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';  
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto'; 
import UseCaseFactory from '../UseCase/UseCaseFactory';
import CreateTaskUseCase from '../UseCase/CreateTask/CreateTaskUseCase';  
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
    const createdTask = await createTaskUseCase.handle(dto);  

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
