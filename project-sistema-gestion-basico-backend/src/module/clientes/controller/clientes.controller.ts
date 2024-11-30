import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ClientesService } from '../service/clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Clientes } from '../schema/clientes.schema';

import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes') // Ruta base: /clientes
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Clientes> {
    return await this.clientesService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente' })
  async findAll(): Promise<Clientes[]> {
    return await this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id') id: string): Promise<Clientes> {
    return await this.clientesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Clientes> {
    const cliente = await this.clientesService.update(id, updateClienteDto);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.clientesService.delete(id);
  }

  @Put('activate/:id')
  @ApiOperation({ summary: 'Activar un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente activado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del cliente que se desea activar',
    type: String,
  })
  async activate(@Param('id') id: string): Promise<Clientes> {
    return await this.clientesService.activate(id);
  }

  @Put('deactivate/:id')
  @ApiOperation({ summary: 'Desactivar un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente desactivado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del cliente que se desea desactivar',
    type: String,
  })
  async deactivate(@Param('id') id: string): Promise<Clientes> {
    return await this.clientesService.deactivate(id);
  }
}
