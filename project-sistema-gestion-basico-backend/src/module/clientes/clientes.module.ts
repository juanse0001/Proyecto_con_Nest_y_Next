import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { ClientesController } from './clientes.controller';
import { ClientesService } from './service/clientes.service';
import { Cliente, ClienteSchema } from './schema/clientes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
  ],
  //controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // Exporta el servicio si otros módulos lo necesitan
})
export class ClientesModule {}
