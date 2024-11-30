import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosServices } from './services/productos.services';
import { ProductosController } from './controller/productos.controller';
import { Productos, ProductosSchema } from './schema/productos.schema';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { RelacionesProductoService } from './services/relaciones-producto.service';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Productos.name, schema: ProductosSchema }]),
    ProveedoresModule, // Asegúrate de importar el módulo de proveedores
    ClientesModule, // Importa el módulo de clientes
  ],
  controllers: [ProductosController],
  providers: [ProductosServices, RelacionesProductoService],
  exports: [ProductosServices, RelacionesProductoService],
})
export class ProductosModule {}
