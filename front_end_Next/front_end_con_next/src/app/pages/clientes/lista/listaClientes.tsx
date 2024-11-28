/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// Tipos
interface Cliente {
  _id: string;
  nombre: string;
  correoElectronico: string;
  telefono: string;
  estado: string;
}

// Estilos para botones
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

const ClienteLista: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, '_id'>>({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    estado: 'activo',
  });
  const [openModal, setOpenModal] = useState(false);
  const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const obtenerClientes = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/clientes'); // Cambiar el puerto si es necesario
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setErrorMessage('No se pudo obtener la lista de clientes');
      setOpenSnackbar(true);
    }
  };
  

  // Crear un cliente
  const crearCliente = async (data: Omit<Cliente, '_id'>) => {
    const response = await fetch('/api/clientes', {
      method: 'POST', // Ruta para crear un cliente
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setNuevoCliente({ nombre: '', correoElectronico: '', telefono: '', estado: 'activo' });
      setOpenModal(false);
      await obtenerClientes();
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Error al crear cliente');
      setOpenSnackbar(true);
    }
  };

  // Eliminar un cliente
  const eliminarCliente = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`/api/clientes/${id}`, {
          method: 'DELETE', // Ruta para eliminar un cliente por ID
        });

        if (response.ok) {
          await obtenerClientes();
          Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
        } else {
          setErrorMessage('Error al eliminar cliente');
          setOpenSnackbar(true);
        }
      }
    });
  };

  // Actualizar un cliente
  const actualizarCliente = async (id: string, data: Omit<Cliente, '_id'>) => {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'PUT', // Ruta para actualizar un cliente por ID
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await obtenerClientes();
      setOpenEditModal(false);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Error al actualizar cliente');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

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
          Lista de Clientes
        </Typography>

        <AddButton onClick={() => setOpenModal(true)}>
          <AddIcon /> Agregar Cliente
        </AddButton>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: '#6a11cb' }}>Nombre</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Correo Electrónico</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Teléfono</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Estado</TableCell>
                <TableCell style={{ color: '#6a11cb' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente._id}>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.correoElectronico}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.estado}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar cliente">
                      <EditButton onClick={() => setClienteEditado(cliente)}>
                        <EditIcon />
                      </EditButton>
                    </Tooltip>
                    <Tooltip title="Eliminar cliente">
                      <DeleteButton onClick={() => eliminarCliente(cliente._id)}>
                        <DeleteIcon />
                      </DeleteButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para agregar cliente */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box>
            {/* Formulario para agregar cliente */}
          </Box>
        </Modal>

        {/* Modal para editar cliente */}
        {clienteEditado && (
          <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
            <Box>
              {/* Formulario para editar cliente */}
            </Box>
          </Modal>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </section>
    </Container>
  );
};

export default ClienteLista;
