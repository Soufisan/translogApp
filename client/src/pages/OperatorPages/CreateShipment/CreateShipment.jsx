import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/CreateContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const inicialText = {
  origin_address: '',
  destination_address: '',
  phone_number: '',
  weight: '',
  location: '',
  notes: '',
};
const CreateShipment = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [addShipment, setAddShipment] = useState(inicialText);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddShipment({ ...addShipment, [name]: value });
  };
  console.log(addShipment);

  const onSubmit = async () => {
    try {
      const shipmentResult = await fetchData(
        '/shipments/createShipment',
        'POST',
        addShipment,
        token
      );
      if (shipmentResult.status === 200) {
        setAddShipment(inicialText);
        navigate('/user/shipment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="w-50">
      <h3>Registro de envío</h3>
      <FloatingLabel controlId="floatingInput" label="Origen" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Almacén Madrid"
          name="origin_address"
          value={addShipment.origin_address}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Destino" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Calle Juan Carlos"
          name="destination_address"
          value={addShipment.destination_address}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Número teléfono">
        <Form.Control
          type="tel"
          placeholder="656321543"
          className="mb-3"
          name="phone_number"
          value={addShipment.phone_number}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Peso (Kg)">
        <Form.Control
          type="number"
          placeholder="5"
          className="mb-3"
          name="weight"
          value={addShipment.weight}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Ubicación del paquete">
        <Form.Control
          type="text"
          placeholder="5"
          className="mb-3"
          name="location"
          value={addShipment.location}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Nota">
        <Form.Control
          as="textarea"
          placeholder="Una breve nota"
          style={{ height: '100px' }}
          name="notes"
          value={addShipment.notes}
          onChange={handleChange}
        />
      </FloatingLabel>
      <br />
      <Row>
        <Col>
          <Button
            as={Link}
            to="/user/shipment"
            className="w-100 border-0"
          >
            Volver
          </Button>
        </Col>
        <Col>
          <Button className="w-100 bg-success border-0" onClick={onSubmit}>
            GUARDAR
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateShipment;
