import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createtipo, updatetipo } from '../../services/tipoServicio';
import Swal from 'sweetalert2';

const TipoForm = ({ tipoData, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        if (tipoData) {
            setFormData({
                nombre: tipoData.nombre || '',
                descripcion: tipoData.descripcion || ''
            });
        }
    }, [tipoData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tipoData) {
                await updatetipo(tipoData._id, formData);
                Swal.fire('Éxito', 'Tipo actualizado correctamente', 'success');
            } else {
                await createtipo(formData);
                Swal.fire('Éxito', 'Tipo creado correctamente', 'success');
            }
            onSave();
        } catch (error) {
            console.error('Error saving tipo:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el tipo', 'error');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="border p-4 rounded">
            <h2>{tipoData ? 'Editar Tipo' : 'Nuevo Tipo'}</h2>
            
            <Form.Group className="mb-3">
                <Form.Label>Nombre del Tipo</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Película, Serie, Documental"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="me-2">
                    {tipoData ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button variant="secondary" onClick={() => onSave()}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default TipoForm;