import { HomePage, LoginPage, NotFoundPage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import LayoutAll from '../components/global/layout/Layout';
import { MY_ROUTE } from './route.constant';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LayoutAll />,
    children: [{ path: MY_ROUTE.LOGIN, element: <LoginPage /> }],
  },
  {
    path: '/',
    element: <LayoutAll />,
    children: [{ path: MY_ROUTE.HOME, element: <HomePage /> }],
  },
  { path: '/*', element: <NotFoundPage /> },
]);

export default router;
