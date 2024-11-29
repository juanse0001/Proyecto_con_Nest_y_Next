export interface ICliente {
    id?: string;
    nombre_cliente: string;            // Nombre completo del cliente
    email_cliente: string; // Dirección de correo electrónico
    celular_cliente: string;          // Número de teléfono
    estado: boolean; // Estado del cliente (activo o inactivo)
  }
  