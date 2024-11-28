'use client';
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

// Estilo para las tarjetas dinámicas
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
  },
  width: "100%",
  marginBottom: theme.spacing(2),
  borderRadius: "20px",
  backgroundColor: "#f9f9f9",
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    width: "75%",
    margin: "auto",
  },
}));

// Estilo para los botones de acción personalizados
const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
  fontSize: "0.875rem",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "10px",
  transition: "background-color 0.3s ease",
}));

const ActivateButton = styled(ActionButton)({
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
});

const DeactivateButton = styled(ActionButton)({
  backgroundColor: "#ff9800",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#f57c00",
  },
});

const DeleteButton = styled(ActionButton)({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const ClienteLista = () => {
  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    estado: 'activo',
  });
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [actionType, setActionType] = useState<'create' | 'update'>('create');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/clientes');
      if (!response.ok) throw new Error('Error al obtener los clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      setErrorMessage('Error al obtener los clientes');
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = (cliente: any = null) => {
    setSelectedCliente(cliente);

    if (cliente) {
      setFormValues({
        nombre: cliente.nombre,
        correoElectronico: cliente.correoElectronico,
        telefono: cliente.telefono,
        estado: cliente.estado,
      });
      setActionType('update');
    } else {
      setFormValues({
        nombre: '',
        correoElectronico: '',
        telefono: '',
        estado: 'activo',
      });
      setActionType('create');
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCliente(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSaveCliente = async () => {
    try {
      // Validación de valores iniciales
      if (!formValues.nombre || !formValues.correoElectronico || !formValues.telefono) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      // Inicialización de URL y método
      let url: string;
      let method: "POST" | "PUT";
  
      if (actionType === "create") {
        url = "http://localhost:2000/api/clientes";
        method = "POST";
      } else if (actionType === "update") {
        if (!selectedCliente || !selectedCliente._id) {
          throw new Error("No se ha seleccionado un cliente para actualizar");
        }
        url = `http://localhost:2000/api/clientes/${selectedCliente._id}`;
        method = "PUT";
      } else {
        throw new Error("Tipo de acción desconocido");
      }
  
      // Verificación final de la URL y método
      if (!url || !method) {
        throw new Error("La URL o el método HTTP no están definidos");
      }
  
      // Llamada a la API
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
  
      // Manejo de errores de respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar el cliente");
      }
  
      // Éxito: Recargar clientes y cerrar modal
      fetchClientes();
      handleCloseModal();
      setErrorMessage(""); // Limpiar mensaje de error si la operación fue exitosa
    } catch (error: any) {
      // Manejo de errores
      console.error("Error al guardar el cliente:", error);
      setErrorMessage(error.message || "Error al guardar el cliente");
      setOpenSnackbar(true); // Mostrar mensaje de error en el Snackbar
    }
  };
  

  const handleActivate = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/activate/${id}`, { method: 'PUT' });
      fetchClientes();
    } catch (error) {
      console.error("Error al activar el cliente:", error);
      setErrorMessage("Error al activar el cliente");
      setOpenSnackbar(true);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/deactivate/${id}`, { method: 'PUT' });
      fetchClientes();
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
      setErrorMessage("Error al desactivar el cliente");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/${id}`, { method: 'DELETE' });
      fetchClientes();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      setErrorMessage("Error al eliminar el cliente");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <section
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          padding: "20px",
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          style={{ marginBottom: "30px" }}
        >
          Crear Cliente
        </Button>

        <Grid container spacing={3}>
          {clientes.map((cliente: any) => (
            <Grid item xs={12} md={6} key={cliente._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {cliente.nombre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {cliente.correoElectronico}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Teléfono: {cliente.telefono}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: cliente.estado === "activo" ? "#4caf50" : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {cliente.estado === "activo" ? "Activo" : "Inactivo"}
                  </Typography>
                  <Button onClick={() => handleOpenModal(cliente)}>Actualizar</Button>
                  {cliente.estado === "activo" ? (
                    <DeactivateButton onClick={() => handleDeactivate(cliente._id)}>
                      Desactivar
                    </DeactivateButton>
                  ) : (
                    <ActivateButton onClick={() => handleActivate(cliente._id)}>
                      Activar
                    </ActivateButton>
                  )}
                  <DeleteButton onClick={() => handleDelete(cliente._id)}>Eliminar</DeleteButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </section>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{actionType === "create" ? "Crear Cliente" : "Actualizar Cliente"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo Electrónico"
            name="correoElectronico"
            value={formValues.correoElectronico}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Teléfono"
            name="telefono"
            value={formValues.telefono}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveCliente} color="primary">
            {actionType === "create" ? "Crear" : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorMessage || "Operación exitosa"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClienteLista;
