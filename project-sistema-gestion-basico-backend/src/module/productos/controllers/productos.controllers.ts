import { Controller, Post, Get, Put, Delete, Patch, Param, Body } from '@nestjs/common';
import { ProductosServices } from '../services/productos.services';
import { RelacionesProductoService } from '../services/relaciones-producto.service';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/update-productos.dto';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosServices: ProductosServices,
    private readonly relacionesProductoService: RelacionesProductoService,
  ) {}

  // Crear un producto
  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosServices.createProducto(createProductoDto);
  }

  // Obtener todos los productos
  @Get()
  async findAll() {
    return this.productosServices.findAllProductos();
  }

  // Obtener un producto por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productosServices.findOne(id);
  }

  // Actualizar un producto completamente
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductosDto: UpdateProductosDto) {
    return this.productosServices.update(id, updateProductosDto);
  }

  // Actualizar parcialmente un producto
  @Patch(':id')
  async updatePartial(@Param('id') id: string, @Body() updateProductosDto: UpdateProductosDto) {
    return this.productosServices.updatePartial(id, updateProductosDto);
  }

  // Activar un producto
  @Patch('activate/:id')
  async activate(@Param('id') id: string) {
    return this.productosServices.active(id);
  }

  // Desactivar un producto
  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    return this.productosServices.deactivate(id);
  }

  // Eliminar un producto
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productosServices.delete(id);
  }

  // Agregar un proveedor a un producto
  @Patch(':productoId/proveedor/:proveedorId')
  async agregarProveedor(
    @Param('productoId') productoId: string,
    @Param('proveedorId') proveedorId: string,
  ) {
    return this.relacionesProductoService.agregarProveedorAProducto(productoId, proveedorId);
  }

  // Eliminar un proveedor de un producto
  @Delete(':productoId/proveedor/:proveedorId')
  async eliminarProveedor(
    @Param('productoId') productoId: string,
    @Param('proveedorId') proveedorId: string,
  ) {
    return this.relacionesProductoService.eliminarProveedorDeProducto(productoId, proveedorId);
  }

  // Agregar un cliente a un producto
  @Patch(':productoId/cliente/:clienteId')
  async agregarCliente(
    @Param('productoId') productoId: string,
    @Param('clienteId') clienteId: string,
  ) {
    return this.relacionesProductoService.agregarClientesAProducto(productoId, clienteId);
  }

  // Eliminar un cliente de un producto
  @Delete(':productoId/cliente/:clienteId')
  async eliminarCliente(
    @Param('productoId') productoId: string,
    @Param('clienteId') clienteId: string,
  ) {
    return this.relacionesProductoService.eliminarClientesDeProducto(productoId, clienteId);
  }
}
