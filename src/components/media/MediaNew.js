import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getgenero } from '../../services/generoServicio';
import { getdirector } from '../../services/directorServicio';
import { getproductora } from '../../services/productoraServicio';
import { gettipo } from '../../services/tipoServicio';
import { createmedia, updatemedia, getmediabyid } from '../../services/mediaServicio';

const MediaNew = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagenPortada: '',
    añoEstreno: new Date().getFullYear(),
    generoPrincipal: '',
    directorPrincipal: '',
    productora: '',
    tipo: ''
  });
  
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const isEdit = !!id;

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingForm(true);
        
        // Cargar datos en paralelo
        const [generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
          getgenero(),
          getdirector(),
          getproductora(),
          gettipo()
        ]);

        setGeneros(generosRes.data);
        setDirectores(directoresRes.data);
        setProductoras(productorasRes.data);
        setTipos(tiposRes.data);

        // Si es edición, cargar los datos existentes
        if (isEdit) {
          const { data } = await getmediabyid(id);
          if (!data) {
            throw new Error('No se encontraron datos de la película/serie');
          }
          
          setFormData({
            serial: data.serial || '',
            titulo: data.titulo || '',
            sinopsis: data.sinopsis || '',
            url: data.url || '',
            imagenPortada: data.imagenPortada || '',
            añoEstreno: data.añoEstreno || new Date().getFullYear(),
            generoPrincipal: data.generoPrincipal?._id || data.generoPrincipal || '',
            directorPrincipal: data.directorPrincipal?._id || data.directorPrincipal || '',
            productora: data.productora?._id || data.productora || '',
            tipo: data.tipo?._id || data.tipo || ''
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
        history.push('/');
      } finally {
        setLoadingForm(false);
      }
    };

    loadInitialData();
  }, [id, history, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepara los datos en el formato que espera el backend
      const mediaData = {
        serial: formData.serial,
        titulo: formData.titulo,
        sinopsis: formData.sinopsis,
        url: formData.url,
        imagenPortada: formData.imagenPortada,
        añoEstreno: formData.añoEstreno,
        generoPrincipal: formData.generoPrincipal,
        directorPrincipal: formData.directorPrincipal,
        productora: formData.productora,
        tipo: formData.tipo
      };
  
      Swal.fire({
        title: isEdit ? 'Actualizando...' : 'Creando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });
  
      if (isEdit) {
        await updatemedia(id, mediaData);
      } else {
        await createmedia(mediaData);
      }
  
      Swal.fire({
        icon: 'success',
        title: isEdit ? '¡Actualizado!' : '¡Creado!',
        text: `Película/Serie ${isEdit ? 'actualizada' : 'creada'} correctamente`
      });
      history.push('/');
    } catch (error) {
      console.error('Error saving media:', error);
      let errorMessage = 'Ocurrió un error';
      
      // Mensaje más descriptivo basado en la respuesta del servidor
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loadingForm) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEdit ? 'Editar' : 'Nueva'} Película/Serie</h2>
        <Button variant="secondary" onClick={() => history.push('/')}>
          Cancelar
        </Button>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="serial">
              <Form.Label>Serial</Form.Label>
              <Form.Control
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                required
                disabled={isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="sinopsis">
          <Form.Label>Sinopsis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="url">
              <Form.Label>URL del contenido</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="imagenPortada">
              <Form.Label>URL de la imagen de portada</Form.Label>
              <Form.Control
                type="url"
                name="imagenPortada"
                value={formData.imagenPortada}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="añoEstreno">
              <Form.Label>Año de estreno</Form.Label>
              <Form.Control
                type="number"
                name="añoEstreno"
                value={formData.añoEstreno}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="generoPrincipal">
              <Form.Label>Género principal</Form.Label>
              <Form.Select
                name="generoPrincipal"
                value={formData.generoPrincipal}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar género</option>
                {generos.map(genero => (
                  <option key={genero._id} value={genero._id}>
                    {genero.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="directorPrincipal">
              <Form.Label>Director principal</Form.Label>
              <Form.Select
                name="directorPrincipal"
                value={formData.directorPrincipal}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar director</option>
                {directores.map(director => (
                  <option key={director._id} value={director._id}>
                    {director.nombres}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map(tipo => (
                  <option key={tipo._id} value={tipo._id}>
                    {tipo.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="productora">
          <Form.Label>Productora</Form.Label>
          <Form.Select
            name="productora"
            value={formData.productora}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar productora</option>
            {productoras.map(prod => (
              <option key={prod._id} value={prod._id}>
                {prod.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            size="lg" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Guardando...</span>
              </>
            ) : isEdit ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MediaNew;