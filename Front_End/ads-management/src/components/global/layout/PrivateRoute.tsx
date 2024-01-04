import { MY_ROUTE } from '@/router/route.constant';
import { useLoginStore } from '@/store/auth/auth.store';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function PrivateRoute() {
  const location = useLocation();
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && !isLoggedIn) {
      navigate(MY_ROUTE.LOGIN);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Outlet />
  ) : isLoggedIn === false ? (
    <Navigate to={MY_ROUTE.LOGIN} state={{ from: location }} replace />
  ) : (
    <></>
  );
}
