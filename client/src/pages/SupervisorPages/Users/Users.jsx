import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


const Users = () => {
  return (
    <div>
        <Button
            as={Link}
            to="/register"
        >Crear usuario nuevo</Button>
      <h2>Listado de usuarios</h2>
    </div>
  )
}

export default Users


