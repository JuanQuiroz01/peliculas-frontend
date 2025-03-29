import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DirectorForm = ({ directorData, onSave }) => {
    const [formData, setFormData] = useState({
        nombres: '',
        estado: 'Activo'
    });

    useState(() => {
        if (directorData) {
            setFormData({
                nombres: directorData.nombres,
                estado: directorData.estado
            });
        }
    }, [directorData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            Swal.fire('Éxito', directorData ? 'Director actualizado' : 'Director creado', 'success');
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="border p-4 rounded">
            <Row className="mb-3">
                <Form.Group as={Col} controlId="nombres">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Christopher Nolan"
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="estado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="me-2">
                    {directorData ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button variant="secondary" onClick={() => onSave(null)}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default DirectorForm;