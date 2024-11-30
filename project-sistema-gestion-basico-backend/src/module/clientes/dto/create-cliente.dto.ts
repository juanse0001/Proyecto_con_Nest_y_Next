import { IsString, IsEmail, IsPhoneNumber, IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsEmail()
  readonly correoElectronico: string;

  @IsNotEmpty()
  @IsPhoneNumber() // Validación global para cualquier número de teléfono internacional
  readonly telefono: string;

  @IsOptional() // El estado es opcional al crear un cliente
  @IsIn(['activo', 'inactivo']) // Solo permite los valores "activo" o "inactivo"
  readonly estado?: 'activo' | 'inactivo';
}
