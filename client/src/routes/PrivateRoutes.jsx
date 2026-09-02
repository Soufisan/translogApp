import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoutes = ({ user, requiredType }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.type_role !== requiredType) {
      navigate('/');
    }
  });
  return <Outlet />;
};
