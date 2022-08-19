import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre del Cliente es obligatorio')
      .min(3, 'El nombre del Cliente debe tener al menos 3 caracteres')
      .max(50, 'El nombre del Cliente debe tener menos de 50 caracteres'),
    empresa: Yup.string().required(
      'El nombre de la empresa es obligatoria'
    ),
    email: Yup.string()
      .required('El email es obligatorio')
      .email('El email no es valido'),
    telefono: Yup.number()
      .typeError('El teléfono debe ser numérico')
      .integer('Número no válido')
      .positive('Número no válido'),
  });

  const handleSumit = async values => {
    try {
      let response;
      if (cliente.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        const url = import.meta.env.VITE_API_URL;
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      await response.json();
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md: w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center ">
        {cliente.id ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente.nombre ? cliente.nombre : '',
          empresa: cliente.empresa ? cliente.empresa : '',
          email: cliente.email ? cliente.email : '',
          telefono: cliente.telefono ? cliente.telefono : '',
          notas: cliente.notas ? cliente.notas : '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSumit(values);
          resetForm();
          navigate('/clientes');
        }}
        validationSchema={nuevoClienteSchema}
      >
        {() => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Nombre">
                  Nombre
                </label>
                <Field
                  id="Nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />

                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 mt-1  "
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Empresa">
                  Empresa
                </label>
                <Field
                  id="Empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                <ErrorMessage
                  name="empresa"
                  component="div"
                  className="text-red-500 mt-1  "
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  E-mail
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="E-mail del cliente"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1  "
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Teléfono del cliente"
                  name="telefono"
                />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="text-red-500 mt-1  "
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100 h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
                <ErrorMessage
                  name="notas"
                  component="div"
                  className="text-red-500 mt-1  "
                />
              </div>{' '}
              <input
                value={cliente.id ? 'Editar Cliente' : 'Agregar Cliente'}
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md hover:bg-blue-900 cursor-pointer transition-all duration-300 ease-in-out"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
