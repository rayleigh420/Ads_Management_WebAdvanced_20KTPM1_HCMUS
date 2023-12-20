import {
  HomePage,
  NotFoundPage,
  ReportForm,
  RequireLisenceForm,
  RequireEditForm,
  CompanyDetailForm,
  AdDetailForm,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import { MY_ROUTE } from './route.constant';
import { LayoutAll } from '@/components/global';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAll />,
    children: [
      { path: MY_ROUTE.HOME, element: <HomePage /> },
      { path: MY_ROUTE.REPORT, element: <ReportForm /> },
      { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLisenceForm /> },
      { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
      { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
      { path: MY_ROUTE.AD_DETAIL, element: <AdDetailForm /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);

export default router;
