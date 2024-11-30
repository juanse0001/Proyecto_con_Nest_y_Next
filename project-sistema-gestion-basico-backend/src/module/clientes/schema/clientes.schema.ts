import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IClientes } from '../interface/clientes.interface';
import { Document } from 'mongoose';

@Schema()
export class Clientes extends Document implements IClientes {
  @Prop({ required: true })
  nombre: string; // Nombre completo del cliente

  @Prop({ required: true, unique: true, lowercase: true })
  correoElectronico: string; // Correo electrónico único y en minúsculas

  @Prop({ required: true, match: [/^\d{10}$/, 'Número de teléfono inválido'] })
  telefono: string; // Número de teléfono con validación de 10 dígitos

  @Prop({ enum: ['activo', 'inactivo'], default: 'activo' })
  estado: 'activo' | 'inactivo'; // Estado del cliente
}

export const ClientesSchema = SchemaFactory.createForClass(Clientes);
