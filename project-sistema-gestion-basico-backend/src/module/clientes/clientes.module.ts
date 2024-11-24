import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesService } from './service/clientes.service';
import { ClientesController } from './controller/clientes.controller';
import { Cliente, ClienteSchema } from './schema/clientes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // Exporta el servicio para otros módulos
})
export class ClientesModule {}
