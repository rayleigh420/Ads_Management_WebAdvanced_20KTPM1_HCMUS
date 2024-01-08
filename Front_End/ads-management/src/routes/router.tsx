import { LayoutCity, LayoutResident } from '@/components/global/layout';
import PrivateResidentRoute from '@/components/global/layout/PrivateResidentRoute';
import PrivateRoute from '@/components/global/layout/PrivateRoute';
import PublicRoute from '@/components/global/layout/PublicRoute';
import { UserType } from '@/core/enums/user-type.enum';
import {
  AdsLocationPage,
  AdsRequiredEditPage,
  CompanyDetailForm,
  DistrictManagementPage,
  HomeOfficerPage,
  HomeResidentPage,
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
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        path: 'resident',
        element: <PrivateResidentRoute />,
        children: [
          {
            element: <LayoutResident />,
            children: [
              { path: MY_ROUTE.HOME, element: <HomeResidentPage /> },
              { path: MY_ROUTE.REPORT, element: <ReportForm /> },
              { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLisenceForm /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <AdsLocationPage /> },
            ],
          },
        ],
      },
      {
        path: 'ward',
        element: <PrivateRoute type={UserType.city} />,
        children: [
          {
            path: '',
            element: <LayoutCity />,
            children: [
              { path: MY_ROUTE.HOME, element: <HomeOfficerPage /> },
              { path: MY_ROUTE.REPORT, element: <ReportForm /> },
              { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLisenceForm /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <AdsLocationPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  { path: '/*', element: <NotFoundPage /> },
]);

export default router;
