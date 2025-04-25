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
        createdAt:  dto.createdAt ?? new Date(), // Optionnel, sinon Prisma utilise l'heure actuelle
        updatedAt:  dto.createdAt ?? new Date(),
      }, 
    });
  }

  async updateTask(id: number, data: { title?: string; description?: string }) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // @todo IMPLEMENT HERE USING PRISMA API
    }

    // @todo IMPLEMENT HERE USING PRISMA API
  }
}
