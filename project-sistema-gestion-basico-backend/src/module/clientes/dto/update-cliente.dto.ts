import { IsString, IsEmail, IsPhoneNumber, IsIn, IsOptional } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsEmail()
  readonly correoElectronico?: string;

  @IsOptional()
  @IsPhoneNumber() // Validación global para cualquier número de teléfono internacional
  readonly telefono?: string;

  @IsOptional()
  @IsIn(['activo', 'inactivo']) // Solo permite los valores "activo" o "inactivo"
  readonly estado?: 'activo' | 'inactivo';
}
