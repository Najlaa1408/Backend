import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

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

  async createTask(data: { title: string; description?: string }) {
    return this.prisma.task.create({
      data,
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
