import React, { useState, useEffect } from 'react';
import { getmedia, deletemedia } from '../../services/mediaServicio';
import MediaCard from './MediaCard';
import Swal from 'sweetalert2';

const MediaList = () => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMedias = async () => {
    try {
      const response = await getmedia();
      setMedias(response.data);
    } catch (error) {
      Swal.fire('Error', 'Error cargando películas/series', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true
    });
    
    if (result.isConfirmed) {
      try {
        await deletemedia(id);
        loadMedias();
        Swal.fire('¡Eliminado!', '', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  useEffect(() => {
    loadMedias();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {medias.map(media => (
        <MediaCard 
          key={media._id} 
          media={media} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
};

export default MediaList;