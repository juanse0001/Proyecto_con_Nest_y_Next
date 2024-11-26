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
    marginBottom: theme.spacing(3),
    borderRadius: "20px",
    backgroundColor: "#f9f9f9",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
        width: "75%",
        margin: "auto",
    },
}));

// Estilo para los botones personalizados
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

const UpdateButton = styled(ActionButton)({
    backgroundColor: "#2196f3",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#1976d2",
    },
});

const ProveedorLista = () => {
    // Estados
    const [proveedores, setProveedores] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        nombre_proveedor: "",
        email_proveedor: "",
        celular_proveedor: "",
        activo_proveedor: true,
    });
    const [selectedProveedor, setSelectedProveedor] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionType, setActionType] = useState<"create" | "update">("create");

    // Fetch inicial
    useEffect(() => {
        fetchProveedores();
    }, []);

    // Función para obtener proveedores
    const fetchProveedores = async () => {
        try {
            const respuesta = await fetch("http://localhost:2000/api/proveedores");
            if (!respuesta.ok) throw new Error("Error al obtener todos los proveedores");
            const data = await respuesta.json();
            setProveedores(data);
        } catch (error) {
            console.error("Error al obtener los proveedores:", error);
            setErrorMessage("Error al obtener los proveedores");
            setOpenSnackbar(true);
        }
    };

    // Funciones para manejar modal
    const handleOpenModal = (proveedor: any = null) => {
        setSelectedProveedor(proveedor);
        if (proveedor) {
            setFormValues({
                nombre_proveedor: proveedor.nombre_proveedor,
                email_proveedor: proveedor.email_proveedor,
                celular_proveedor: proveedor.celular_proveedor,
                activo_proveedor: proveedor.activo_proveedor,
            });
            setActionType("update");
        } else {
            setFormValues({
                nombre_proveedor: "",
                email_proveedor: "",
                celular_proveedor: "",
                activo_proveedor: true,
            });
            setActionType("create");
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProveedor(null);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Funciones CRUD
    const handleSaveProveedor = async () => {
        try {
            let url;
            let method;
            if (actionType === "create") {
                url = "http://localhost:2000/api/proveedores";
                method = "POST";
            } else if (actionType === "update") {
                url = `http://localhost:2000/api/proveedores/update/${selectedProveedor._id}`;
                method = "PUT";
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al guardar el proveedor");
            }

            fetchProveedores();
            handleCloseModal();
        } catch (error) {
            console.error("Error al guardar el proveedor:", error);
            setErrorMessage("Error al guardar el proveedor");
            setOpenSnackbar(true);
        }
    };

    const handleActivate = async (id: string) => {
        try {
            await fetch(`http://localhost:2000/api/proveedores/active/${id}`, { method: "PUT" });
            fetchProveedores();
        } catch (error) {
            console.error("Error al activar el proveedor:", error);
        }
    };

    const handleDeactivate = async (id: string) => {
        try {
            await fetch(`http://localhost:2000/api/proveedores/deactivate/${id}`, { method: "PUT" });
            fetchProveedores();
        } catch (error) {
            console.error("Error al desactivar el proveedor:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:2000/api/proveedores/delete/${id}`, { method: "DELETE" });
            fetchProveedores();
        } catch (error) {
            console.error("Error al eliminar el proveedor:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setErrorMessage("");
    };

    // Render
    return (
        <Container maxWidth="lg" style={{ marginTop: "10px" }}>
            {/* ...UI principal del componente */}
        </Container>
    );
};

export default ProveedorLista;
