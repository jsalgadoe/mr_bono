import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum role {
  'USER',
  'ADMIN',
}
export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly name: string;

  @IsEmail({}, { message: 'Ingresa un correo valido ' })
  @IsNotEmpty({ message: 'El correo es obligario' })
  readonly email: string;

  @IsEnum(role, { message: 'El rol debe ser ADMIN o USER' })
  readonly rol: string;
}

export class UpdateUserDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsOptional()
  readonly name: string;

  @IsEmail({}, { message: 'Ingresa un correo valido ' })
  @IsOptional()
  readonly email: string;

  @IsEnum(role, { message: 'El rol debe ser ADMIN o USER' })
  @IsOptional()
  readonly rol: string;
}
