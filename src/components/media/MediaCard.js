import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MediaCard = ({ media, onDelete }) => {
  return (
    <div className="col mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img 
          variant="top" 
          src={media.imagenPortada} 
          style={{ height: '200px', objectFit: 'contain',objectPosition: 'top center', width: '100%' }}
          alt={`Portada de ${media.titulo}`}
          className="img-fluid"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h5">{media.titulo}</Card.Title>
          
          <div className="mb-2">
            <Badge bg="info" className="me-2">
              {media.tipo?.nombre}
            </Badge>
            <Badge bg="secondary">
              {media.añoEstreno}
            </Badge>
          </div>
          
          <Card.Text className="flex-grow-1">
            <small className="text-muted d-block mb-2">
              <strong>Sinopsis:</strong> {media.sinopsis?.length > 100 ? 
                `${media.sinopsis.substring(0, 100)}...` : 
                media.sinopsis}
            </small>
            
            <div className="d-flex flex-wrap gap-1 mb-2">
              <Badge bg="primary">
                <i className="fas fa-film me-1"></i> {media.generoPrincipal?.nombre}
              </Badge>
              <Badge bg="success">
                <i className="fas fa-building me-1"></i> {media.productora?.nombre}
              </Badge>
              <Badge bg="success">
                <i className="fas fa-building me-1"></i> {media.directorPrincipal?.nombres}
              </Badge>
            </div>
          </Card.Text>
          
          <div className="d-flex justify-content-between mt-auto">
            <Link 
              to={`/media/new?id=${media._id}`}
              className="btn btn-sm btn-outline-primary"
            >
              <i className="fas fa-edit me-1"></i> Editar
            </Link>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(media._id)}
            >
              <i className="fas fa-trash me-1"></i> Eliminar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MediaCard;