import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

// Crear usuario //*
// Consultar todos los usuarios.
// Consultar un usuario por ID.
// Actualizar un usuario.
// Eliminar un usuario.

@Controller('user')
export class UserController {
  constructor(private __userService: UserService) {}
  @Get('all')
  async findAlluser() {
    return 'Api user find all';
  }

  @Post('new')
  async newUser(@Body() userPayload: CreateUserDto) {
    console.log(userPayload);

    const result = await this.__userService.store(userPayload);

    console.log('  Api user  create user ');

    return {
      ok: true,
      message: 'Usuario creado exitosamente',
      type: 'user',
      data: result,
    };
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    const result = await this.__userService.findBy(+id);

    console.log('  Api user  create user ');

    return {
      ok: true,
      message: `El usuario con el id ${id} has sido encontrado exitosamente}`,
      type: 'user',
      data: result,
    };
  }

  @Put('edit/:id')
  async updateUserById(@Param('id') id: number) {
    return `Api user  edit ${id}`;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    return `Api user   delete ${id}`;
  }
}
