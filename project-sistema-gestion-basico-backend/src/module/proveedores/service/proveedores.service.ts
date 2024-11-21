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


}


