import { IsString, IsEmail, IsPhoneNumber, IsIn, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  readonly nombre: string;

  @IsEmail()
  readonly correoElectronico: string;

  @IsPhoneNumber() // Validación global para cualquier número de teléfono internacional
  readonly telefono: string;

  @IsOptional() // El estado es opcional al crear un cliente
  @IsIn(['activo', 'inactivo']) // Solo permite los valores "activo" o "inactivo"
  readonly estado?: 'activo' | 'inactivo';
}
