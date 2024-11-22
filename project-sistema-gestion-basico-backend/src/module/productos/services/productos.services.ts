import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Productos } from '../schema/productos.schema';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/update-productos.dto';

@Injectable()
export class ProductosServices {
  constructor(
    @InjectModel(Productos.name) private productosModel: Model<Productos>,
  ) {}

  async createProducto(createProductosDto: CreateProductoDto): Promise<Productos> {
    const createProducto = new this.productosModel(createProductosDto);
    return createProducto.save();
  }

  async findAllProductos(): Promise<Productos[]> {
    return this.productosModel.find().populate('proveedor').exec();
  }

  async findOne(id: string): Promise<Productos> {
    const producto = await this.productosModel.findById(id).populate('proveedor').exec();
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
    return producto;
  }

  async update(id: string, updateProductosDto: UpdateProductosDto): Promise<Productos> {
    const producto = await this.productosModel
      .findByIdAndUpdate(id, updateProductosDto, { new: true })
      .exec();

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
    return producto;
  }

  async deactivate(id: string): Promise<void> {
    const producto = await this.productosModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    ).exec();

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
  }

  async active(id: string): Promise<void> {
    const producto = await this.productosModel.findByIdAndUpdate(
      id,
      { activo: true },
      { new: true },
    ).exec();

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
  }

  async delete(id: string): Promise<void> {
    const producto = await this.productosModel.findByIdAndDelete(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
  }
}
