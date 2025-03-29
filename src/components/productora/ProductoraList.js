import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import { getproductora, deleteproductora } from '../../services/productoraServicio';
import Swal from 'sweetalert2';

const ProductoraList = ({ onEdit }) => {
    const [productoras, setProductoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductoras();
    }, []);

    const fetchProductoras = async () => {
        try {
            const response = await getproductora();
            setProductoras(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching productoras:', error);
            Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
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
                await deleteproductora(id);
                await Swal.fire('¡Eliminada!', 'La productora ha sido eliminada.', 'success');
                fetchProductoras();
            } catch (error) {
                let errorMessage = 'No se pudo eliminar la productora';
                if (error.response) {
                    errorMessage = error.response.data.message || errorMessage;
                }
                Swal.fire('Error', errorMessage, 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" />
                <p>Cargando productoras...</p>
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
                    <th>Última Actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productoras.map((productora, index) => (
                    <tr key={productora._id}>
                        <td>{index + 1}</td>
                        <td>{productora.nombre}</td>
                        <td>
                            <Badge bg={productora.estado === 'Activo' ? 'success' : 'secondary'}>
                                {productora.estado}
                            </Badge>
                        </td>
                        <td>{productora.descripcion || '-'}</td>
                        <td>{new Date(productora.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            {productora.fechaActualizacion 
                                ? new Date(productora.fechaActualizacion).toLocaleDateString() 
                                : 'Nunca'}
                        </td>
                        <td>
                            <Button 
                                variant="warning" 
                                size="sm" 
                                onClick={() => onEdit(productora)}
                                className="me-2"
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDelete(productora._id)}
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

export default ProductoraList;