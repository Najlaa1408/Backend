import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import SaveTaskDto from 'src/UseCase/SaveTask/SaveTaskDto';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async createTask(dto : SaveTaskDto) {
    return this.prisma.task.create({
      data: {
        name:dto.name, 
        createdAt:  dto.createdAt ?? new Date(), 
        updatedAt:  dto.createdAt ?? new Date(),
      }, 
    });
  }

  async updateTask(id: number, dto: SaveTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        name: dto.name,
        createdAt: dto.createdAt,
        updatedAt: new Date(), 
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    
  }
}
