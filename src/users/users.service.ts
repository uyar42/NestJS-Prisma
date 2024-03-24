import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: Prisma.UserCreateInput) {
    if (data.username) {
      const findUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (findUser) throw new HttpException('Username already taken', 400);
    }
    if (!data) throw new HttpException('Enter correct data,', 400);

    return this.prisma.user.create({
      data: {
        ...data,
        userSettings: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({ include: { userSettings: true } });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSettings: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },

        },
        posts: true,
      },

    });
  }

  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User Not Found', 404);

    if (data.username) {
      const findUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (findUser) throw new HttpException('Username already taken', 400);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async updateUserSettings(
    userId: number,
    data: Prisma.UserSettingsUpdateInput,
  ) {
    const findUser = await this.getUserById(userId);
    if (!findUser) throw new HttpException('User Not Found', 404);
    if (!findUser.userSettings) throw new HttpException('No Settings', 400);
    return this.prisma.userSettings.update({ where: { userId }, data });
  }
}