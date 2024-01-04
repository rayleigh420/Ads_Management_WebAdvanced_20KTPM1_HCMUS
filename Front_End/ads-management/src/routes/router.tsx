import { LayoutAll } from '@/components/global';
import {
  AdDetailForm,
  AdsLocationPage,
  AdsRequiredEditPage,
  CompanyDetailForm,
  DistrictManagementPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ReportForm,
  RequireEditForm,
  RequireLisenceForm,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import { MY_ROUTE } from './route.constant';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LayoutAll />,
    children: [
      { path: MY_ROUTE.HOME, element: <HomePage /> },
      { path: MY_ROUTE.REPORT, element: <ReportForm /> },
      { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLisenceForm /> },
      { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
      { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
      { path: `${MY_ROUTE.ADS.detail(':id')}`, element: <AdDetailForm /> },
      { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
      { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
      { path: MY_ROUTE.ADS.LOCATION, element: <AdsLocationPage /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);

export default router;
