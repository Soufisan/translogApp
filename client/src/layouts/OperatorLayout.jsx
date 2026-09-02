import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/CreateContext';
import { Button, Col, Row } from 'react-bootstrap';

export const OperatorLayout = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <>
      <header>
        <Row className='pt-3'>
          <Col>
            <h4>Operador</h4>
          </Col>
          <Col>
            <Button className="bg-danger border-0" onClick={logOut}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
