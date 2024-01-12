import { LayoutCity, LayoutResident, LayoutWard } from '@/components/global/layout';
import PrivateResidentRoute from '@/components/global/layout/PrivateResidentRoute';
import PrivateRoute from '@/components/global/layout/PrivateRoute';
import PublicRoute from '@/components/global/layout/PublicRoute';
import { UserType } from '@/core/enums/user-type.enum';
import {
  AdsLocationPage,
  AdsRequiredEditPage,
  CompanyDetailForm,
  HomeOfficerPage,
  HomeResidentPage,
  LoginPage,
  NotFoundPage,
  ReportFormModal,
  RequireEditForm,
  RequireLicenseForm,
} from '@/pages';
import AdminBoardLocationPage from '@/pages/admin/board/AdminBoardLocationPage';
import AdminDistrictManagementPage from '@/pages/admin/district/AdminDistrictManagementPage';
import AdminLocationListPage from '@/pages/admin/location/AdminLocationListPage';
import AdminWardPage from '@/pages/admin/ward/AdminWardPage';
import WardLocationListPage from '@/pages/admin/ward/ward-location-list/WardLocationListPage';
import ReportListPage from '@/pages/wards/ReportListPage';
import { createBrowserRouter } from 'react-router-dom';
import { MY_ROUTE } from './route.constant';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        path: UserType.resident,
        element: <PrivateResidentRoute />,
        children: [
          {
            element: <LayoutResident />,
            children: [
              { path: MY_ROUTE.HOME, element: <HomeResidentPage /> },
              { path: MY_ROUTE.REPORT, element: <ReportFormModal /> },
              { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLicenseForm /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              // { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <AdsLocationPage /> },
            ],
          },
        ],
      },
      {
        path: UserType.ward,
        element: <PrivateRoute type={UserType.ward} />,
        children: [
          {
            path: '',
            element: <LayoutWard />,
            children: [
              { path: MY_ROUTE.HOME, element: <HomeOfficerPage /> },
              { path: MY_ROUTE.WARD.REPORT, element: <ReportListPage /> },
              { path: `${MY_ROUTE.WARD.REPORT}/:id`, element: <ReportFormModal /> },
              { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLicenseForm /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              // { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
              { path: MY_ROUTE.ADS.BOARD, element: <AdsLocationPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <WardLocationListPage /> },
            ],
          },
        ],
      },
      {
        path: UserType.district,
        element: <PrivateRoute type={UserType.district} />,
        children: [
          {
            path: '',
            element: <LayoutCity />,
            children: [
              { path: MY_ROUTE.HOME, element: <HomeOfficerPage /> },
              { path: MY_ROUTE.REPORT, element: <ReportFormModal /> },
              { path: MY_ROUTE.REQUIRE_LISENCE, element: <RequireLicenseForm /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              // { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdsRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <AdsLocationPage /> },
            ],
          },
        ],
      },
      {
        path: UserType.admin,
        element: <PrivateRoute type={UserType.admin} />,
        children: [
          {
            path: '',
            element: <LayoutCity />,
            children: [
              { path: MY_ROUTE.ADS.LOCATION, element: <AdminLocationListPage /> },
              { path: `${MY_ROUTE.ADS.BOARD}/:id`, element: <AdminBoardLocationPage /> },
              { path: MY_ROUTE.DISTRICT, element: <AdminDistrictManagementPage /> },
              {
                path: `${MY_ROUTE.DISTRICT}/${MY_ROUTE.WARD.self}/:id`,
                element: <AdminWardPage />,
              },
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
