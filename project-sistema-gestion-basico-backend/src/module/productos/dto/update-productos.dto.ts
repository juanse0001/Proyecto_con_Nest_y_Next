import { IsOptional, IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProductosDto {
  @IsOptional()
  @IsString()
  nombre_producto?: string;

  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsArray()
  proveedor?: string[];

  @IsOptional()
  @IsArray()
  cliente?: string[];

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
