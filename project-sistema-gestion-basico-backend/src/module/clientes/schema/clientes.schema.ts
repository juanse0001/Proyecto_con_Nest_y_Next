import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICliente } from '../interface/clientes.interface';
import { Document } from 'mongoose';

@Schema()
export class Cliente extends Document implements ICliente {
  @Prop({ required: true })
  nombre_cliente: string; // Nombre completo del cliente

  @Prop({ required: true, unique: true, lowercase: true })
  email_cliente: string; // Correo electrónico único y en minúsculas

  @Prop({ required: true, match: [/^\d{10}$/, 'Número de teléfono inválido'] })
  celular_cliente: string; // Número de teléfono con validación de 10 dígitos

  @Prop({ enum: ['activo', 'inactivo'], default: 'activo' })
  estado: boolean; // Estado del cliente
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
