//Decorador de NestJS que marca una clase como inyectable. 
//Esto permite que se utilice como una dependencia.
import { Injectable, NotFoundException } from '@nestjs/common'; 

//Importacones para realizar opercaiones en la base de datos
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Importamos nuestro esquema
import { Proveedores } from '../schema/proveedores.schema';

// Importamos nuestros DTO's
import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';


@Injectable()
export class ProveedoresServices{

    //Inyeccion de dependencias
    constructor(@InjectModel(Proveedores.name) private proveedorModel: Model<Proveedores>){
    }

    
//Metodo para crear un proveedor    
async createProveedor(CreateProveedoresDto): Promise<Proveedores>{
    const createProveedor = new this.proveedorModel(CreateProveedoresDto);
    return createProveedor.save(); 
}

// Método para obtener todos los proveedores
async findAll(): Promise<Proveedores[]> {
    const findAllProveedores = await this.proveedorModel.find().exec();
    return findAllProveedores;
}

// Método para obtener un Proveedor
async findOne(id: string): Promise<Proveedores> {
    const findOneProveedor = await this.proveedorModel.findById(id).exec();
    if (!findOneProveedor) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
    return findOneProveedor;
  }

// Método para actualizar proveedor
async update(id: string, updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores> {
    const updateProveedor = await this.proveedorModel.findByIdAndUpdate(
      id,
      updateProveedoresDto,
      { new: true }
    ).exec();
  
    if (!updateProveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encontró`);
    }
  
    return updateProveedor;
  }
  
// Método para actualizar parcialmente un proveedor
async updatePartial(id: string, updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores> {
    const updatePartialProveedor = await this.proveedorModel.findByIdAndUpdate(
      id,
      updateProveedoresDto,
      { new: true }
    ).exec();
  
    if (!updatePartialProveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encontró`);
    }
  
    return updatePartialProveedor;
  }

// Método para desactivar un Proveedor
async deactivate(id: string): Promise<void> {
    const result = await this.proveedorModel.findByIdAndUpdate(
      id,
      { activo_proveedor: false }, // Actualiza el campo y lo pasa a falso
      { new: true } // Retorna el documento actualizado
    ).exec();
  
    if (!result) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encontró`);
    }
  }

//Metodo para activar un proveedor
async active(id: string): Promise<void> {
    const result = await this.proveedorModel.findByIdAndUpdate(
      id,
      { activo_proveedor: true }, // Actualiza el campo y lo pasa a verdadero
      { new: true } // Retorna el documento actualizado
    ).exec();
  
    if (!result) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encontró`);
    }
  }

  // Método para eliminar un proveedor
async delete(id: string): Promise<void> {
    const deleteProveedor = await this.proveedorModel.findByIdAndDelete(id);
    if (!deleteProveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encontró`);
    }
  }
}


