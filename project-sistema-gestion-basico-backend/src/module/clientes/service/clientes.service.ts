import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clientes } from '../schema/clientes.schema';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Clientes.name) private readonly clienteModel: Model<Clientes>,
  ) {}

  // Crear un cliente
  async create(createClienteDto: CreateClienteDto): Promise<Clientes> {
    const nuevoCliente = new this.clienteModel(createClienteDto);
    return await nuevoCliente.save();
  }

  // Obtener todos los clientes
  async findAll(): Promise<Clientes[]> {
    const findAllClientes = await this.clienteModel.find().exec();
    return findAllClientes
  }

  // Obtener un cliente por ID
  async findOne(id: string): Promise<Clientes> {
    const cliente = await this.clienteModel.findById(id).exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  // Actualizar un cliente
  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Clientes> {
    const clienteActualizado = await this.clienteModel
      .findByIdAndUpdate(id, updateClienteDto, { new: true })
      .exec();
    if (!clienteActualizado) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return clienteActualizado;
  }

  // Eliminar un cliente
  async delete(id: string): Promise<{ mensaje: string }> {
    const resultado = await this.clienteModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return { mensaje: `Cliente con ID ${id} eliminado correctamente` };
  }

    // Activar un cliente
    async activate(id: string): Promise<Clientes> {
      const clienteActivado = await this.clienteModel
        .findByIdAndUpdate(id, { estado: 'activo' }, { new: true })
        .exec();
      if (!clienteActivado) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return clienteActivado;
    }
  
    // Desactivar un cliente
    async deactivate(id: string): Promise<Clientes> {
      const clienteDesactivado = await this.clienteModel
        .findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true })
        .exec();
      if (!clienteDesactivado) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return clienteDesactivado;
    }
}


