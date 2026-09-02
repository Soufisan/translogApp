import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserSchema } from '../../../../schema/registerUserSchema.js';
import { fetchData } from '../../../../helpers/axiosHelper.js';
import { ZodError } from 'zod';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const inicialText = {
  name: '',
  email: '',
  phone_number: '',
  password: '',
  type_role: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [text, setText] = useState(inicialText);
  const [valorError, setValorError] = useState();
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      registerUserSchema.parse(text);
      const res = await fetchData('/auth/register', 'POST', text);
      console.log(res);
      navigate('/users');
      alert('Registro con éxito, revisa tu correo');
    } catch (error) {
      console.log('Error completo:', error);
      console.log('Error response:', error.response?.data);
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.issues.forEach((e) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setValorError(fieldErrors);
        console.log(fieldErrors);
        setErrMsg('');
      } else if (error.response?.data?.errno === 1062) {
        setErrMsg('¡Este correo ya esta registrado!');
      } else {
        console.log('otro error', error);
      }
    }
  };

  return (
    <div>

      <h3>Registrar</h3>
      <Container className="w-50">
        <FloatingLabel
          controlId="floatingInput"
          label="Nombre Completo"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Soufian"
            name="name"
            value={text.name}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="ejemplo@dominio.com"
            name="email"
            value={text.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Contraseña"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="******"
            name="password"
            value={text.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Role usuario">
          <Form.Select
            aria-label="Floating label select example"
            name="type_role"
            id="type_role"
            value={text.type_role}
            onChange={handleChange}
          >
            <option disabled selected hidden value="">
              - Seleccione un role-
            </option>
            <option value={1}>Supervisor</option>
            <option value={2}>Operador</option>
          </Form.Select>
        </FloatingLabel>

        <p className="text-danger">{errMsg}</p>
        {valorError?.password && (
          <p className="text-danger">{valorError.password}</p>
        )}

        <Row>
          <Col>
            <Button className='border-0 w-100' as={Link} to="/users">
              Volver
            </Button>
          </Col>
          <Col>
            <Button className='border-0 bg-success w-100' onClick={onSubmit}>Registrar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
