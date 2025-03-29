import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createproductora, updateproductora } from '../../services/productoraServicio';
import Swal from 'sweetalert2';

const ProductoraForm = ({ productoraData, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        estado: 'Activo',
        descripcion: ''
    });

    useEffect(() => {
        if (productoraData) {
            setFormData({
                nombre: productoraData.nombre || '',
                estado: productoraData.estado || 'Activo',
                descripcion: productoraData.descripcion || ''
            });
        }
    }, [productoraData]);

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
            if (productoraData) {
                await updateproductora(productoraData._id, formData);
                Swal.fire('Éxito', 'Productora actualizada correctamente', 'success');
            } else {
                await createproductora(formData);
                Swal.fire('Éxito', 'Productora creada correctamente', 'success');
            }
            onSave();
        } catch (error) {
            console.error('Error saving productora:', error);
            Swal.fire('Error', 'Hubo un problema al guardar la productora', 'error');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
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
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="me-2">
                    {productoraData ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button variant="secondary" onClick={() => onSave()}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default ProductoraForm;