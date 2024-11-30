/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ProductoLista.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,

} from '@mui/material';
import { styled } from '@mui/system';
import { Productos } from '@/app/types/Producto.type';
import { Proveedores } from '@/app/types/Proveedor.type';
import { Clientes } from '@/app/types/Clientes.type';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import { SelectChangeEvent } from '@mui/material/Select';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';



// Estilos para botones y tabla
const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  fontSize: '0.875rem',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '10px',
}));

const AddButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#6a11cb',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#5a0cb2',
  },
}));

const DeleteButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#d32f2f',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
}));

const EditButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));



// Estilo para las filas interactivas
const InteractiveTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

// Estilo del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const ProductoLista: React.FC = () => {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [nuevoProducto, setNuevoProducto] = useState<Omit<Productos, '_id'>>({
    nombre_producto: '',
    cantidad: 0,
    precio: 0,
    proveedor: [],
    cliente: [],
    activo: true,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState<Productos | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [clientesSeleccionados, setClientesSeleccionados] = useState<string[]>([]);
  const [proveedores, setProveedores] = useState<Proveedores[]>([]);
  const [proveedoresSeleccionados, setProveedoresSeleccionados] = useState<string[]>([]);
  const [producto, setProducto] = useState<Productos | null>(null);


  const obtenerClientes = async () => {
    const response = await fetch('http://localhost:2000/api/clientes');
    const data = await response.json();
    setClientes(data);
  };

  const obtenerProveedores = async () => {
    const response = await fetch('http://localhost:2000/api/proveedores');
    const data = await response.json();
    setProveedores(data);
  };


  const obtenerProductos = async () => {
    const response = await fetch('http://localhost:2000/api/productos');
    const data = await response.json();
    setProductos(data);
  };

  const crearProducto = async (data: Omit<Productos, '_id'>) => {
    try {
      const response = await fetch(`http://localhost:2000/api/productos`, {
        method: 'POST', // Método POST para crear
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(data), // Convertimos los datos a JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el producto');
      }

      // Actualizamos la lista de productos tras la creación exitosa
      setNuevoProducto({ nombre_producto: '', cantidad: 0, precio: 0, proveedor: [], cliente: [], activo: true });
      setOpenModal(false); // Cerramos el modal de creación
      await obtenerProductos(); // Actualizamos la lista de productos
    } catch (error) {
      // Manejo de errores
      console.error('Error al crear el producto:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
      setOpenSnackbar(true); // Mostramos el snackbar con el error
    }
  };


  const eliminarProducto = async (id: string) => {
    // Mostrar SweetAlert para confirmar eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procedemos con la eliminación
        const response = await fetch(`http://localhost:2000/api/productos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await obtenerProductos();
          Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
        } else {
          setErrorMessage('Error al eliminar producto');
          setOpenSnackbar(true);
        }
      }
    });
  };

  const handleClienteChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setClientesSeleccionados(value as string[]);
  };

  const handleProveedorChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setProveedoresSeleccionados(value as string[]); // Asegúrate de que sea un array de strings
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (openModal) {
      obtenerClientes();
      obtenerProveedores();
    }
  }, [openModal]);


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage('');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNuevoProducto({ nombre_producto: '', cantidad: 0, precio: 0, proveedor: [], cliente: [], activo: true });
    setProveedoresSeleccionados([]);
    setClientesSeleccionados([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: name === 'nombre_producto' ? value.toUpperCase() : name === 'cantidad' || name === 'precio' ? Number(value) : value,
    }));
  };

  const handleOpenEditModal = (producto: Productos) => {
    setProductoEditado(producto);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setProductoEditado(null);
  };

  const actualizarProducto = async (id: string, data: Omit<Productos, '_id'>) => {
    try {
      // Utilizamos la URL correcta del controlador
      const response = await fetch(`http://localhost:2000/api/productos/${id}`, {
        method: 'PUT', // Método PUT para actualización completa
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(data), // Convertimos los datos a JSON
      });

      // Verificamos la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el producto');
      }

      // Actualizamos la lista de productos tras la operación exitosa
      await obtenerProductos();
      handleCloseEditModal(); // Cerramos el modal
    } catch (error) {
      // Manejo de errores
      console.error('Error al actualizar el producto:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
      setOpenSnackbar(true); // Mostramos el snackbar con el error
    }
  };



  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (productoEditado) {
      setProductoEditado((prev) => ({
        ...prev!,
        [name]: name === 'nombre_producto' ? value.toUpperCase() : name === 'cantidad' || name === 'precio' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientesSeleccionadosDetalles = clientesSeleccionados.map(id => obtenerClientePorId(id));
    const proveedoresSeleccionadosDetalles = proveedoresSeleccionados.map(id => obtenerProveedorPorId(id));

    const productoData = {
      ...nuevoProducto,
      cliente: clientesSeleccionadosDetalles,
      proveedor: proveedoresSeleccionadosDetalles
    };

    crearProducto(productoData);
  };

  const obtenerClientePorId = (id: string): Clientes => {
    return clientes.find(cliente => cliente.id_cliente === id) as Clientes;
  };

  const obtenerProveedorPorId = (id: string): Proveedores => {
    return proveedores.find(proveedor => proveedor.id_proveedor === id) as Proveedores;
  };


  const toggleActivo = async (id: string, activo: boolean) => {
    const url = `http://localhost:2000/api/productos/${activo ? 'deactivate' : 'activate'}/${id}`;
    try {
      const response = await fetch(url, { method: 'PATCH' });
      if (!response.ok) throw new Error('Error al cambiar estado del producto');
      obtenerProductos();
    } catch (error) {
      console.error('Error al cambiar estado del producto:', error);
    }
  };





  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: '20px',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        paddingBottom: '20px',
      }}
    >
      <section style={{ width: '100%', position: 'relative' }}>
        <Typography variant="h4" style={{ marginBottom: '30px', textAlign: 'center', color: '#fff' }}>
          Lista de Productos
        </Typography>

        {/* Botón para abrir el modal de agregar producto */}
        <Button
          variant="contained"
          onClick={handleOpenModal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: '#6a11cb',
            color: '#fff',
          }}
        >
          <AddIcon /> Agregar Producto
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: '#6a11cb' }}>Nombre del Producto</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Cantidad</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Precio</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Estado</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Clientes Asociados</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Proveedores Asociados </TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto._id}>
                  <TableCell>{producto.nombre_producto}</TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell>${producto.precio}</TableCell>
                  <TableCell>
                    <span style={{ color: producto.activo ? 'green' : 'red', fontWeight: 'bold' }}>
                      {producto.activo ? 'Activo' : 'Desactivado'}
                    </span>
                  </TableCell>

                  <TableCell>
                    {Array.isArray(producto.cliente) && producto.cliente.length > 0 ? (
                      producto.cliente.map((cli) => <div key={cli.id_cliente}>{cli.nombre}</div>)
                    ) : (
                      'Sin clientes'
                    )}
                  </TableCell>

                  <TableCell>
                    {Array.isArray(producto.proveedor) && producto.proveedor.length > 0 ? (
                      producto.proveedor.map((prov) => <div key={prov.id_proveedor}>{prov.nombre_proveedor}</div>)
                    ) : (
                      'Sin proveedores'
                    )}
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Editar producto">
                      <Button onClick={() => handleOpenEditModal(producto)}>
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title={producto.activo ?? false ? 'Desactivar' : 'Activar'}>
                      <Button
                        onClick={() => toggleActivo(producto._id, producto.activo ?? false)}
                        style={{
                          backgroundColor: producto.activo ? 'green' : 'red',
                          color: '#fff',
                        }}
                      >
                        {producto.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar producto">
                      <Button onClick={() => eliminarProducto(producto._id)}>
                        <DeleteIcon />
                      </Button>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para agregar producto */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ ...style, backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Agregar Producto
            </Typography>

            {/* Botón de salir */}
            <Button onClick={handleCloseModal} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
              Salir
            </Button>

            <form onSubmit={handleSubmit}>
              {/* Campos de entrada */}
              <TextField
                name="nombre_producto"
                label="Nombre del Producto"
                value={nuevoProducto.nombre_producto}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
              />
              <TextField
                name="cantidad"
                label="Cantidad"
                type="number"
                value={nuevoProducto.cantidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
              />
              <TextField
                name="precio"
                label="Precio"
                type="number"
                value={nuevoProducto.precio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
              />

              {/* Selección de clientes */}
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ color: 'black' }}>Clientes</InputLabel>
                <Select
                  multiple
                  value={clientesSeleccionados}
                  onChange={handleClienteChange}
                  renderValue={(selected) =>
                    selected.map((id) => obtenerClientePorId(id)?.nombre).join(', ')
                  }
                  sx={{ color: 'black' }}
                >
                  {clientes.map((cliente) => (
                    <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


              {/* Selección de proveedores */}
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ color: 'black' }}>Proveedores</InputLabel>
                <Select
                  multiple
                  value={proveedoresSeleccionados}
                  onChange={handleProveedorChange}
                  renderValue={(selected) =>
                    selected.map((id) => obtenerProveedorPorId(id)?.nombre_proveedor).join(', ')
                  }
                  sx={{ color: 'black' }}
                >
                  {proveedores.map((proveedor) => (
                    <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                      {proveedor.nombre_proveedor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Botón para guardar */}
              <Button variant="contained" type="submit" fullWidth sx={{ marginTop: '20px' }}>
                Guardar Producto
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Modal para editar producto */}
        <Modal open={openEditModal} onClose={handleCloseEditModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2" style={{ marginBottom: '16px', color: 'purple' }}>
              Editar Producto
            </Typography>
            {productoEditado && (
              <form onSubmit={(e) => { e.preventDefault(); actualizarProducto(productoEditado._id, productoEditado); }}>
                <TextField
                  label="Nombre del Producto"
                  name="nombre_producto"
                  value={productoEditado.nombre_producto}
                  onChange={handleEditChange}
                  required
                  fullWidth
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Cantidad"
                  name="cantidad"
                  type="number"
                  value={productoEditado.cantidad}
                  onChange={handleEditChange}
                  required
                  fullWidth
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Precio"
                  name="precio"
                  type="number"
                  value={productoEditado.precio}
                  onChange={handleEditChange}
                  required
                  fullWidth
                  style={{ marginBottom: '16px' }}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
                  Actualizar
                </Button>
                <Button variant="outlined" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleCloseEditModal}>
                  Salir
                </Button>
              </form>
            )}
          </Box>
        </Modal>

        {/* Snackbar para mensajes de error */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </section>
    </Container>
  );
};

export default ProductoLista;