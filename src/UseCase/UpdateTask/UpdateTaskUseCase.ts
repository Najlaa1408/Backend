import { Injectable } from '@nestjs/common';
import SaveTaskDto from '../SaveTask/SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number, dto: SaveTaskDto) {
    return this.taskRepository.updateTask(id,dto);
  }
}
