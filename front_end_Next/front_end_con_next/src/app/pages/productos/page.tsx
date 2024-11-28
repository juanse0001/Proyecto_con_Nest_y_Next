'use client';
import ProductoLista from "./lista/listaProductos";

export default function ProductosPage() {
  // Aquí puedes definir un productoId para pasar al componente

  return (
    <div>
      {/* Renderiza el componente de gestión de proveedores y clientes */}
      <ProductoLista />
    </div>
  );
}
