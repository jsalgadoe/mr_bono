import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async store(userPayload: CreateUserDto) {
    const { rol, ...rest } = userPayload;
    try {
      const register = await this.prisma.user.create({
        data: {
          ...rest,
          rol: rol as Role,
        },
      });

      return register;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          console.log(
            'Esta intentado crear un usuario con un correo existente',
          );

          throw new ConflictException(
            'Esta intentado crear un usuario con un correo existente',
          );
        }
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();

      if (users.length === 0) {
        throw new NotFoundException('No hay usuario para mostrars');
      }

      return users;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2001') {
          throw new ConflictException(
            'El usuario que este intentando buscar con ese id no existe',
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('El usuario no existe ');
        }
      }
      throw error;
    }
  }

  async findBy(id: number) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2001') {
          throw new ConflictException(
            'El usuario que este intentando buscar con ese id no existe',
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('El usuario no existe ');
        }
      }
      throw error;
    }
  }

  async updateBy(id: number, userUpdatePayload: UpdateUserDto) {
    const { rol, ...rest } = userUpdatePayload;
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
      });

      if (!userExists) {
        throw new NotFoundException('El usuario no existe');
      }

      const userUpdate = this.prisma.user.update({
        where: {
          id: +id,
        },
        data: {
          ...rest,
          rol: rol as Role,
        },
      });

      return userUpdate;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2001') {
          throw new ConflictException(
            'El usuario que este intentando buscar con ese id no existe',
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('El usuario no existe ');
        }
      }
      throw error;
    }
  }

  async deleteBy(id: number) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
      });

      if (!userExists) {
        throw new NotFoundException('El usuario no existe');
      }

      const deleteUser = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      return deleteUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2001') {
          throw new ConflictException(
            'El usuario que este intentando buscar con ese id no existe',
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('El usuario no existe ');
        }
      }
      throw error;
    }
  }
}
