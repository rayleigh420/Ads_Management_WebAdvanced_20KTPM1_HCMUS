import { UserType } from '@/core/enums/user-type.enum';
import { MY_ROUTE } from '@/routes/route.constant';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PrivateResidentRoute() {
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth re', auth.type);
    console.log('auth re', !auth.isLogin);
    if (auth.type !== UserType.resident) {
      if (!auth.isLogin) navigate(MY_ROUTE.LOGIN);
      else navigate(`/${auth.type}`);
    }
  }, [auth]);

  return <Outlet />;
}
