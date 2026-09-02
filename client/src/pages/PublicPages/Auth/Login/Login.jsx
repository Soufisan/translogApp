import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/CreateContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import { Button, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const initialValue = {
  email: '',
  password: '',
};

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [login, setLogin] = useState(initialValue);
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');

    try {
      e.preventDefault();

      const res = await fetchData('/auth/login', 'POST', login);
      const token = res.data.token;
      localStorage.setItem('token', token); //guardar token

      //petición al back para traer datos
      const resUser = await fetchData('/auth/getUserToken', 'GET', null, token);
      setToken(token);
      setUser(resUser.data.user);

      console.log(resUser);
    } catch (error) {
      if (error.response?.data?.message === 'Email no registrado') {
        setErrMsg('Este correo no está registrado');
      } else if (error.response?.data?.message === 'Contraseña incorrecta') {
        setErrMsg('La contraseña no es correcta');
      } else {
        setErrMsg('Error al iniciar sesión, inténtalo de nuevo');
      }
      console.log(error);
    }
  };

  return (
    <Container className="w-50">
      <h2>Iniciar sesión</h2>
      <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Contraseña"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errMsg && <p className="text-danger mt-2">{errMsg}</p>}

      <Button className='w-100' onClick={onSubmit}>ACCEDER</Button>
    </Container>
  );
};

export default Login;
