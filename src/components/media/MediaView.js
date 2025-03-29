import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MediaList from './MediaList';

const MediaView = () => {
  const history = useHistory();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Películas y Series</h1>
        <Button 
          variant="primary"
          onClick={() => history.push('/media/new')}
        >
          <i className="fas fa-plus me-2"></i> Agregar Nueva
        </Button>
      </div>
      <MediaList />
    </div>
  );
};

export default MediaView;