import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const GeneroForm = ({ generoData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        estado: 'Activo',
        descripcion: ''
    });

    useState(() => {
        if (generoData) {
            setFormData({
                nombre: generoData.nombre,
                estado: generoData.estado,
                descripcion: generoData.descripcion || ''
            });
        }
    }, [generoData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Form onSubmit={handleSubmit} className="border p-4 rounded">
            <Row className="mb-3">
                <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Acción, Comedia, Drama"
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

            <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción del género"
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="me-2">
                    {generoData ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default GeneroForm;