import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { STORAGE } from './core/constants/share.constants';
import { UserType } from './core/enums/user-type.enum';
import { getEnum } from './core/parser/enum.parser';
import { AntdConfigProvider, ReactQueryProvider } from './providers';
import { router } from './routes';
import { loginSuccess } from './store/auth/auth.slice';
import { BaseHTTP } from './utils/config/http';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userType =
      getEnum<UserType>(Cookies.get(STORAGE.USER_TYPE) || UserType.resident, UserType) ||
      UserType.resident;
    if (userType !== UserType.resident) {
      BaseHTTP.getInstance().config({
        accessToken: Cookies.get(STORAGE.ACCESS_TOKEN),
      });
      dispatch(loginSuccess({ type: userType, userToken: Cookies.get(STORAGE.ACCESS_TOKEN) }));
    }
  }, []);

  return (
    <ReactQueryProvider>
      <AntdConfigProvider>
        <ToastContainer />
        <RouterProvider router={router} />;
      </AntdConfigProvider>
    </ReactQueryProvider>
  );
}

export default App;
