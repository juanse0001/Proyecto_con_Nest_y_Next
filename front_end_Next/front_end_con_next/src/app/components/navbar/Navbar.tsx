'use client';
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import Link from "next/link";

// Estilos personalizados para los elementos del sidebar
const SidebarContainer = styled(Box)({
    width: 250,
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Gradiente similar al de los otros componentes
    height: "100vh",
    color: "#fff",
    padding: "20px",
    transition: "all 0.3s ease-in-out",
});

const SidebarHeader = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
    color: "#fff", // Cambiado a blanco para mejor contraste
});

const SidebarItem = styled(ListItem)({
    padding: "15px 10px",
    margin: "10px 0",
    borderRadius: "10px", // Bordes más redondeados
    transition: "background-color 0.3s ease, transform 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semi-transparente al pasar el ratón
        transform: "translateX(-3px)", // Efecto de elevación sutil
    },
});

const SidebarDivider = styled(Divider)({
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Divisor semi-transparente
    margin: "10px 0",
});
