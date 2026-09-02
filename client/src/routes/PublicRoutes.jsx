import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PublicRoutes = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.type_role === 1) navigate('/users');
      if (user.type_role === 2) navigate('/user/shipment');
    }
  }, [user]);
  return <Outlet />;
};
