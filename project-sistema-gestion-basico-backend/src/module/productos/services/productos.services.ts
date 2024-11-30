import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

import { Productos } from '../schema/productos.schema';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/update-productos.dto';
import { Clientes } from 'src/module/clientes/schema/clientes.schema';
import { Proveedores } from 'src/module/proveedores/schema/proveedores.schema';

@Injectable()
export class ProductosServices {
  constructor(
    @InjectModel(Productos.name) private productosModel: Model<Productos>,
    @InjectModel(Clientes.name) private clientesModel: Model<Clientes>,
    @InjectModel(Proveedores.name) private proveedoresModel: Model<Proveedores>,
  ) {}

  async createProducto(createProductosDto: CreateProductoDto): Promise<Productos> {
    const createProducto = new this.productosModel(createProductosDto);
    return createProducto.save();
  }

   // Obtener todos los productos con proveedores y clientes poblados
   async findAllProductos(): Promise<Productos[]> {
    return this.queryWithPopulate(this.productosModel.find());
  }

  // Buscar un producto por ID con proveedores y clientes poblados
  async findOne(id: string): Promise<Productos> {
    this.validateIdFormat(id);

    const producto = await this.queryWithPopulate(
      this.productosModel.findById(id)
    );

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }

    return producto;
  }

  // Método privado para validar el formato del ID
  // Método privado para validar el formato del ID
  private validateIdFormat(id: string): void {


    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`El ID ${id} no es válido`);      
    }
  } 


  // Método privado para agregar `populate` a las consultas
  private queryWithPopulate(query: any): any {
    return query
      .populate('proveedor', 'nombre_proveedor email_proveedor') // Población de proveedores
      .populate('cliente', 'nombre email') // Población de clientes
      .exec();
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

  async updatePartial(id: string, updateProductosDto: UpdateProductosDto): Promise<Productos> {
    // Actualiza parcialmente el producto en la base de datos
    const updatePartialProducto = await this.productosModel.findByIdAndUpdate(
      id,
      { $set: updateProductosDto }, // Utiliza `$set` para actualizar solo los campos especificados
      { new: true } // Devuelve el documento actualizado
    ).exec();
  
    // Si el producto no existe, lanza una excepción
    if (!updatePartialProducto) {
      throw new NotFoundException(`Producto con ID ${id} no se encontró`);
    }
  
    return updatePartialProducto;
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
