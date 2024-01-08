import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function PublicRoute() {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/') {
      navigate(auth.type);
    }
  }, [auth]);

  return <Outlet />;
}
