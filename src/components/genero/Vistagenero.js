import React, { useState, useEffect } from 'react';
import GeneroList from './GeneroList';
import GeneroForm from './GeneroForm';
import { creategenero, updategenero, getgenero } from '../../services/generoServicio';
import Swal from 'sweetalert2';

const Vistagenero = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentGenero, setCurrentGenero] = useState(null);
  const [generos, setGeneros] = useState([]);

  // Función para cargar los géneros
  const fetchGeneros = async () => {
    try {
      const response = await getgenero(); // Ahora en minúscula
      setGeneros(response.data);
    } catch (error) {
      console.error('Error al cargar géneros:', error);
      Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
    }
  };

  const handleSave = async (data) => {
    try {
      if (currentGenero) {
        await updategenero(currentGenero._id, { // Ahora en minúscula
          ...data,
          fechaActualizacion: new Date().toISOString()
        });
        Swal.fire('Éxito', 'Género actualizado correctamente', 'success');
      } else {
        await creategenero(data); // Ahora en minúscula
        Swal.fire('Éxito', 'Género creado correctamente', 'success');
      }
      setShowForm(false);
      setCurrentGenero(null);
      fetchGeneros();
    } catch (error) {
      console.error('Error al guardar género:', error);
      Swal.fire('Error', 'No se pudo guardar el género', 'error');
    }
  };
  const handleCancel = () => {
    setShowForm(false);
    setCurrentGenero(null);
  };
  // Cargar géneros al montar el componente
  useEffect(() => {
    fetchGeneros();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Géneros</h1>
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => {
          setCurrentGenero(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Ver Lista' : 'Agregar Nuevo'}
      </button>

      {showForm ? (
        <GeneroForm 
          generoData={currentGenero}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <GeneroList 
          generos={generos}
          onEdit={(genero) => {
            setCurrentGenero(genero);
            setShowForm(true);
          }}
          onDelete={fetchGeneros}
        />
      )}
    </div>
  );
};

export default Vistagenero;