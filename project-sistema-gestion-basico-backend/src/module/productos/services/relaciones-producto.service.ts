import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Productos } from '../schema/productos.schema';
import { ProveedoresServices } from 'src/module/proveedores/service/proveedores.service';
import { ClientesService } from 'src/module/clientes/service/clientes.service';

@Injectable()
export class RelacionesProductoService {
  constructor(
    @InjectModel(Productos.name) private productosModel: Model<Productos>,
    private proveedoresServices: ProveedoresServices,
    private clientesServices: ClientesService,
  ) {}

  async agregarProveedorAProducto(productoId: string, proveedorId: string): Promise<Productos> {
    const producto = await this.productosModel.findById(productoId);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    const proveedor = await this.proveedoresServices.findOne(proveedorId);
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
    }

    if (!producto.proveedor.includes(proveedorId)) {
      producto.proveedor.push(proveedorId);
    } else {
      throw new ConflictException(`El proveedor ya está asociado a este producto`);
    }

    return producto.save();
  }

  async eliminarProveedorDeProducto(productoId: string, proveedorId: string): Promise<Productos> {
    const producto = await this.productosModel.findById(productoId);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    const proveedorIndex = producto.proveedor.indexOf(proveedorId);
    if (proveedorIndex === -1) {
      throw new ConflictException(`El proveedor no está asociado a este producto`);
    }

    producto.proveedor.splice(proveedorIndex, 1);

    return producto.save();
  }

  async agregarClientesAProducto(productoId: string, clienteId: string): Promise<Productos> {
    const producto = await this.productosModel.findById(productoId);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    const cliente = await this.clientesServices.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con Id ${clienteId} no asociado`);
    }

    if (!producto.cliente.includes(clienteId)) {
      producto.cliente.push(clienteId);
    } else {
      throw new ConflictException(`El cliente ya está asociado a este producto`);
    }

    return producto.save();
  }

  async eliminarClientesDeProducto(productoId: string, clienteId: string): Promise<Productos> {
    const producto = await this.productosModel.findById(productoId);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    const clientesIndex = producto.cliente.indexOf(clienteId);
    if (clientesIndex === -1) {
      throw new ConflictException(`El cliente no está asociado a este producto`);
    }

    producto.cliente.splice(clientesIndex, 1);

    return producto.save();
  }
}
