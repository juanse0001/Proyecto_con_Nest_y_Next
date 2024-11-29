/* eslint-disable @typescript-eslint/no-unused-vars */
// Indicamos que estamos utilizando el cliente de React
'use client';
import React from "react";
import type { AppProps } from "next/app"; // Importamos el tipo adecuado de Next.js
import ProveedorLista from "./proveedores/lista/listaProveedores";
import ClienteLista from "./clientes/lista/listaClientes";
import ProductoLista from "./productos/lista/listaProductos";
import styled from "../page.module.css";


export default function HomePage()  {
    return (
        <div className={styled.page}>

            <main className={styled.main}>
                <h1>bienvenido a mi pagina de iniHcio</h1>
                {}
            </main>

            <footer className={styled.footer}>
                <p>2024 &copy; Todos los derechos reservados</p>
            </footer>
        </div>
    );
}