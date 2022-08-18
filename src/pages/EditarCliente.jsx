import { Formulario } from '../components/Formulario';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

export const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const resultado = await response.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">
        Editar Cliente
      </h1>
      <p className="mt-3">
        Utiliza este formulario para editar un Cliente
      </p>
      {cliente.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no valido</p>
      )}
    </>
  );
};
