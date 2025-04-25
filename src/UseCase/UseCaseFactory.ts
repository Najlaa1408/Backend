import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import CreateTaskUseCase from './CreateTask/CreateTaskUseCase';
import { UpdateTaskUseCase } from './UpdateTask/UpdateTaskUseCase';

type UseCases = GetAllTasksUseCase | DeleteTask | CreateTaskUseCase | UpdateTaskUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
