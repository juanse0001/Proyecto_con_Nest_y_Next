import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IProductos } from '../interface/productos.interface';
import { Clientes } from 'src/module/clientes/schema/clientes.schema';

@Schema()
export class Productos extends Document implements IProductos {
  @Prop({ required: true })
  nombre_producto: string; 

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  precio: number;

  // Definir como un array de strings que referencia a Proveedores
  @Prop({ type: [String], ref: 'Proveedores', required: true })
  proveedor: string[];

  @Prop({ type: [String], ref: 'Clientes', required: true })
  cliente: string[];

  @Prop({ default: true })
  activo?: boolean;
}

export const ProductosSchema = SchemaFactory.createForClass(Productos);
