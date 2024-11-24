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
  import { Cliente } from '../schema/clientes.schema';
  
  // Importación necesaria para documentar en Swagger
  import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
  
  @ApiTags('Clientes') // Grupo para los endpoints en la documentación
  @Controller('clientes') // Ruta base para el controlador
  export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}
  
    // Crear un cliente
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Solicitud inválida' })
    @ApiBody({
      description: 'Datos necesarios para crear un cliente',
      examples: {
        ejemplo: {
          summary: 'Ejemplo de creación de cliente',
          value: {
            nombre: 'Juan Pérez',
            correoElectronico: 'juan.perez@example.com',
            telefono: '1234567890',
            estado: 'activo',
          },
        },
      },
    })
    async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
      return await this.clientesService.create(createClienteDto);
    }
  
    // Obtener todos los clientes
    @Get()
    @ApiOperation({ summary: 'Obtener todos los clientes' })
    @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente' })
    async findAll(): Promise<Cliente[]> {
      return await this.clientesService.findAll();
    }
  
    // Obtener un cliente por ID
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'ID del cliente que se desea obtener',
      type: String,
    })
    async findOne(@Param('id') id: string): Promise<Cliente> {
      return await this.clientesService.findOne(id);
    }
  
    // Actualizar un cliente
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un cliente existente' })
    @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiBody({
      description: 'Datos necesarios para actualizar un cliente',
      examples: {
        ejemplo: {
          summary: 'Ejemplo de actualización de cliente',
          value: {
            nombre: 'Juan Actualizado',
            correoElectronico: 'juan.actualizado@example.com',
            telefono: '0987654321',
            estado: 'activo',
          },
        },
      },
    })
    async update(
      @Param('id') id: string,
      @Body() updateClienteDto: UpdateClienteDto,
    ): Promise<Cliente> {
      const cliente = await this.clientesService.update(id, updateClienteDto);
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return cliente;
    }
  
    // Eliminar un cliente
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente' })
    @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'ID del cliente que se desea eliminar',
      type: String,
    })
    async delete(@Param('id') id: string): Promise<void> {
      await this.clientesService.delete(id);
    }
  }
  