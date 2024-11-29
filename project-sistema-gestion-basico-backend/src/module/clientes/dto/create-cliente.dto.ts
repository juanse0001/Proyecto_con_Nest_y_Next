import { IsString, IsEmail, IsPhoneNumber, IsIn, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  readonly nombre_cliente: string;

  @IsEmail()
  readonly email_cliente: string;

  @IsPhoneNumber() // Validación global para cualquier número de teléfono internacional
  readonly celular_cliente: string;

  @IsOptional() // El estado es opcional al crear un cliente
  @IsIn(['activo', 'inactivo']) // Solo permite los valores "activo" o "inactivo"
  readonly estado?: 'activo' | 'inactivo';
}
