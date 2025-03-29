import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import { getgenero, deletegenero } from '../../services/generoServicio';
import Swal from 'sweetalert2';

const GeneroList = ({ onEdit }) => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const response = await getgenero();
            setGeneros(response.data);
        } catch (error) {
            console.error('Error al obtener géneros:', error);
            Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            try {
                await deletegenero(id);
                await Swal.fire('¡Eliminado!', 'El género ha sido eliminado.', 'success');
                fetchGeneros();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el género', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" />
                <p>Cargando géneros...</p>
            </div>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    <th>Fecha Creación</th>
                    <th>Fecha Actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {generos.map((genero, index) => (
                    <tr key={genero._id}>
                        <td>{index + 1}</td>
                        <td>{genero.nombre}</td>
                        <td>
                            <Badge bg={genero.estado === 'Activo' ? 'success' : 'secondary'}>
                                {genero.estado}
                            </Badge>
                        </td>
                        <td>{genero.descripcion || '-'}</td>
                        <td>{new Date(genero.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            {genero.fechaActualizacion ? 
                            new Date(genero.fechaActualizacion).toLocaleDateString() : 
                            'N/A'}
                         </td>
                        <td>
                            <Button 
                                variant="outline-warning" 
                                size="sm" 
                                onClick={() => onEdit(genero)}
                                className="me-2"
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(genero._id)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default GeneroList;