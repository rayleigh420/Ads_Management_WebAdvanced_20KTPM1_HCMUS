import { UserType } from '@/core/enums/user-type.enum';
import { MY_ROUTE } from '@/routes/route.constant';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PrivateRoute({ type }: { type: UserType }) {
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth', auth.type);
    console.log('auth', auth.isLogin);
    console.log('auth type', type);
    if (auth.type === type) {
      if (auth.isLogin === false) navigate(MY_ROUTE.LOGIN);
    } else {
      if (auth.isLogin !== undefined) navigate(MY_ROUTE.LOGIN);
    }
  }, [auth]);

  return <Outlet />;
}
