
import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from '../SaveTask/SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class CreateTaskUseCase {
  constructor(private  taskRepository: TaskRepository) {}

  // Méthode pour exécuter la logique de création de la tâche
  async handle(dto: SaveTaskDto) {
    // Appel au repository pour créer la tâche
    const newTask = await this.taskRepository.createTask(dto);
    return newTask;
  }
}