import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ProductosServices } from '../services/productos.services';
import { RelacionesProductoService } from '../services/relaciones-producto.service';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/update-productos.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Productos') // Agrupación en Swagger
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosServices: ProductosServices,
    private readonly relacionesProductoService: RelacionesProductoService,
  ) {}

  // Crear un producto
  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiBody({
    description: 'Datos necesarios para crear un producto',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de creación',
        value: {
          nombre_producto: 'Producto A',
          precio: 100,
          cantidad: 10,
        },
      },
    },
  })
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosServices.createProducto(createProductoDto);
  }

  // Obtener todos los productos
  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Productos obtenidos exitosamente' })
  async findAll() {
    return this.productosServices.findAllProductos();
  }

  // Obtener un producto por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea obtener',
  })
  async findOne(@Param('id') id: string) {
    return this.productosServices.findOne(id);
  }

  // Actualizar un producto completamente
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto completamente' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiBody({
    description: 'Datos necesarios para actualizar un producto',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de actualización',
        value: {
          nombre_producto: 'Producto Actualizado',
          precio: 200,
          cantidad: 5,
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea actualizar',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductosDto: UpdateProductosDto,
  ) {
    return this.productosServices.update(id, updateProductosDto);
  }

  // Actualizar parcialmente un producto
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado parcialmente' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea actualizar parcialmente',
  })
  @ApiBody({
    description: 'Datos para actualizar parcialmente el producto',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de actualización parcial',
        value: {
          precio: 150,
        },
      },
    },
  })
  async updatePartial(
    @Param('id') id: string,
    @Body() updateProductosDto: UpdateProductosDto,
  ) {
    return this.productosServices.updatePartial(id, updateProductosDto);
  }

  // Activar un producto
  @Patch('activate/:id')
  @ApiOperation({ summary: 'Activar un producto' })
  @ApiResponse({ status: 200, description: 'Producto activado exitosamente' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea activar',
  })
  async activate(@Param('id') id: string) {
    return this.productosServices.active(id);
  }

  // Desactivar un producto
  @Patch('deactivate/:id')
  @ApiOperation({ summary: 'Desactivar un producto' })
  @ApiResponse({ status: 200, description: 'Producto desactivado exitosamente' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea desactivar',
  })
  async deactivate(@Param('id') id: string) {
    return this.productosServices.deactivate(id);
  }

  // Eliminar un producto
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto que se desea eliminar',
  })
  async delete(@Param('id') id: string) {
    return this.productosServices.delete(id);
  }

  // Agregar un proveedor a un producto
  @Patch(':productoId/proveedor/:proveedorId')
  @ApiOperation({ summary: 'Agregar un proveedor a un producto' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor agregado al producto exitosamente',
  })
  @ApiParam({
    name: 'productoId',
    required: true,
    description: 'ID del producto',
  })
  @ApiParam({
    name: 'proveedorId',
    required: true,
    description: 'ID del proveedor a agregar',
  })
  async agregarProveedor(
    @Param('productoId') productoId: string,
    @Param('proveedorId') proveedorId: string,
  ) {
    return this.relacionesProductoService.agregarProveedorAProducto(
      productoId,
      proveedorId,
    );
  }

  // Eliminar un proveedor de un producto
  @Delete(':productoId/proveedor/:proveedorId')
  @ApiOperation({ summary: 'Eliminar un proveedor de un producto' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor eliminado del producto exitosamente',
  })
  @ApiParam({
    name: 'productoId',
    required: true,
    description: 'ID del producto',
  })
  @ApiParam({
    name: 'proveedorId',
    required: true,
    description: 'ID del proveedor a eliminar',
  })
  async eliminarProveedor(
    @Param('productoId') productoId: string,
    @Param('proveedorId') proveedorId: string,
  ) {
    return this.relacionesProductoService.eliminarProveedorDeProducto(
      productoId,
      proveedorId,
    );
  }

  // Agregar un cliente a un producto
  @Patch(':productoId/cliente/:clienteId')
  @ApiOperation({ summary: 'Agregar un cliente a un producto' })
  @ApiResponse({
    status: 200,
    description: 'Cliente agregado al producto exitosamente',
  })
  @ApiParam({
    name: 'productoId',
    required: true,
    description: 'ID del producto',
  })
  @ApiParam({
    name: 'clienteId',
    required: true,
    description: 'ID del cliente a agregar',
  })
  async agregarCliente(
    @Param('productoId') productoId: string,
    @Param('clienteId') clienteId: string,
  ) {
    return this.relacionesProductoService.agregarClientesAProducto(
      productoId,
      clienteId,
    );
  }

  // Eliminar un cliente de un producto
  @Delete(':productoId/cliente/:clienteId')
  @ApiOperation({ summary: 'Eliminar un cliente de un producto' })
  @ApiResponse({
    status: 200,
    description: 'Cliente eliminado del producto exitosamente',
  })
  @ApiParam({
    name: 'productoId',
    required: true,
    description: 'ID del producto',
  })
  @ApiParam({
    name: 'clienteId',
    required: true,
    description: 'ID del cliente a eliminar',
  })
  async eliminarCliente(
    @Param('productoId') productoId: string,
    @Param('clienteId') clienteId: string,
  ) {
    return this.relacionesProductoService.eliminarClientesDeProducto(
      productoId,
      clienteId,
    );
  }
}
