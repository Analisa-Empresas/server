import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUser) {
    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        userName: faker.internet.userName(),
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async getById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return { user };
  }
}
