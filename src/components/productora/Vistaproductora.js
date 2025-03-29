import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductoraList from './ProductoraList';
import ProductoraForm from './ProductoraForm';

const VistaProductora = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentProductora, setCurrentProductora] = useState(null);

    const handleEdit = (productora) => {
        setCurrentProductora(productora);
        setShowForm(true);
    };

    const handleSave = () => {
        setCurrentProductora(null);
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <h1>Productoras</h1>
            
            <Button 
                variant="primary" 
                className="mb-3"
                onClick={() => {
                    setCurrentProductora(null);
                    setShowForm(!showForm);
                }}
            >
                {showForm ? 'Ver Lista' : 'Agregar Nueva'}
            </Button>

            {showForm ? (
                <div className="card p-4">
                    <h2>{currentProductora ? 'Editar Productora' : 'Nueva Productora'}</h2>
                    <ProductoraForm 
                        productoraData={currentProductora} 
                        onSave={handleSave}
                    />
                </div>
            ) : (
                <ProductoraList onEdit={handleEdit} />
            )}
        </div>
    );
};

export default VistaProductora;