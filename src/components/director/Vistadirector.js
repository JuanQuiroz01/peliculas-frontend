import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DirectorList from './DirectorList';
import DirectorForm from './DirectorForm';
import { createdirector, updatedirector } from '../../services/directorServicio';

const VistaDirector = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentDirector, setCurrentDirector] = useState(null);

    const handleSave = async (data) => {
        try {
            if (data === null) {
                // Caso de cancelación: No hacer petición HTTP
                setShowForm(false);
                setCurrentDirector(null);
                return;
            }
    
            if (currentDirector) {
                await updatedirector(currentDirector._id, data);
            } else {
                await createdirector(data);
            }
            setShowForm(false);
            setCurrentDirector(null);
        } catch (error) {
            console.error('Error saving director:', error);
            throw error;
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Directores</h1>
                {!showForm && (
                    <Button 
                        variant="primary" 
                        onClick={() => setShowForm(true)}
                    >
                        Agregar Nuevo
                    </Button>
                )}
            </div>

            {showForm ? (
                <DirectorForm 
                    directorData={currentDirector}
                    onSave={handleSave}
                />
            ) : (
                <DirectorList 
                    onEdit={(director) => {
                        setCurrentDirector(director);
                        setShowForm(true);
                    }}
                />
            )}
        </div>
    );
};

export default VistaDirector;