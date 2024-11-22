export interface Cliente {
    nombre: string;            // Nombre completo del cliente
    correoElectronico: string; // Dirección de correo electrónico
    telefono: string;          // Número de teléfono
    estado: 'activo' | 'inactivo'; // Estado del cliente (activo o inactivo)
  }
  