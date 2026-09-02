import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/CreateContext';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Shipment = () => {
  const { token } = useContext(AuthContext);
  const [shipmentList, setShipmentList] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState();

  const fetchShipment = async () => {
    try {
      const resultShipmentList = await fetchData(
        '/shipments',
        'GET',
        null,
        token
      );
      console.log(resultShipmentList.data.shipments);
      setShipmentList(resultShipmentList.data.shipments);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchShipment();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Button as={Link} to="/user/createShipment">
            Crear Envío
          </Button>
        </Col>
        <Col className="mx-4">
          <FloatingLabel controlId="floatingInput" label="Buscar">
            <Form.Control
              type="text"
              placeholder="Almacén Madrid"
              name="origin_address"
              //value={}
              //onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <hr />
      <h3>Listado de Envios</h3>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>Nº Seguimiento</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>NºTeléfono</th>
            <th>Estado Actual</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {shipmentList.map((shipment) => {
            return (
              <tr key={shipment.shipment_id}>
                <td>{shipment.tracking_code}</td>
                <td>{shipment.origin_address}</td>
                <td>{shipment.destination_address}</td>
                <td>{shipment.phone_number}</td>
                <td>
                  <Button 
                  >CREADO</Button>
                </td>
                <td>
                  <Button className="border-1 border-success bg-white text-success">
                    Ver más
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Shipment;
