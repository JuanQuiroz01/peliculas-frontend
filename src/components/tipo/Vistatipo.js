import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TipoList from './TipoList';
import TipoForm from './TipoForm';

const VistaTipo = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentTipo, setCurrentTipo] = useState(null);

    const handleSave = () => {
        setCurrentTipo(null);
        setShowForm(false);
    };

    const handleEdit = (tipo) => {
        setCurrentTipo(tipo);
        setShowForm(true);
    };

    return (
        <div className="container mt-4">
            <h1>Tipos de Contenido</h1>
            
            <Button 
                variant="primary" 
                className="mb-3"
                onClick={() => {
                    setCurrentTipo(null);
                    setShowForm(!showForm);
                }}
            >
                {showForm ? 'Ver Lista' : 'Agregar Nuevo'}
            </Button>

            {showForm ? (
                <div className="card p-4">
                    <TipoForm 
                        tipoData={currentTipo}
                        onSave={handleSave}
                    />
                </div>
            ) : (
                <TipoList onEdit={handleEdit} />
            )}
        </div>
    );
};

export default VistaTipo;
