import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import { getdirector, deletedirector } from '../../services/directorServicio';
import Swal from 'sweetalert2';

const DirectorList = ({ onEdit }) => {
    const [directores, setDirectores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDirectores();
    }, []);

    const fetchDirectores = async () => {
        try {
            const response = await getdirector();
            setDirectores(response.data);
        } catch (error) {
            console.error('Error fetching directores:', error);
            Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
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
                await deletedirector(id);
                await Swal.fire('¡Eliminado!', 'El director ha sido eliminado.', 'success');
                fetchDirectores();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el director', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" />
                <p>Cargando directores...</p>
            </div>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Estado</th>
                    <th>Fecha Creación</th>
                    <th>Última Actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {directores.map((director, index) => (
                    <tr key={director._id}>
                        <td>{index + 1}</td>
                        <td>{director.nombres}</td>
                        <td>
                            <Badge bg={director.estado === 'Activo' ? 'success' : 'secondary'}>
                                {director.estado}
                            </Badge>
                        </td>
                        <td>{new Date(director.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            {director.fechaActualizacion 
                                ? new Date(director.fechaActualizacion).toLocaleDateString() 
                                : 'Nunca'}
                        </td>
                        <td>
                            <Button 
                                variant="outline-warning" 
                                size="sm" 
                                onClick={() => onEdit(director)}
                                className="me-2"
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(director._id)}
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

export default DirectorList;