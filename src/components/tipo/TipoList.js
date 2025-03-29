import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { gettipo, deletetipo } from '../../services/tipoServicio';
import Swal from 'sweetalert2';

const TipoList = ({ onEdit }) => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTipos();
    }, []);

    const fetchTipos = async () => {
        try {
            const response = await gettipo();
            setTipos(response.data);
        } catch (error) {
            console.error('Error fetching tipos:', error);
            Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
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
                await deletetipo(id);
                await Swal.fire('¡Eliminado!', 'El tipo ha sido eliminado.', 'success');
                fetchTipos();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el tipo', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" />
                <p>Cargando tipos...</p>
            </div>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha Creación</th>
                    <th>Última Actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipos.map((tipo, index) => (
                    <tr key={tipo._id}>
                        <td>{index + 1}</td>
                        <td>{tipo.nombre}</td>
                        <td>{tipo.descripcion || '-'}</td>
                        <td>{new Date(tipo.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            {tipo.fechaActualizacion 
                                ? new Date(tipo.fechaActualizacion).toLocaleDateString() 
                                : 'Nunca'}
                        </td>
                        <td>
                            <Button 
                                variant="warning" 
                                size="sm" 
                                onClick={() => onEdit(tipo)}
                                className="me-2"
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDelete(tipo._id)}
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

export default TipoList;