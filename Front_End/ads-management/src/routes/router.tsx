import { LayoutCity, LayoutResident, LayoutWard } from '@/components/global/layout';
import PrivateResidentRoute from '@/components/global/layout/PrivateResidentRoute';
import PrivateRoute from '@/components/global/layout/PrivateRoute';
import PublicRoute from '@/components/global/layout/PublicRoute';
import { UserType } from '@/core/enums/user-type.enum';
import {
  AdminRequiredEditPage,
  CompanyDetailForm,
  HomeOfficerPage,
  HomeResidentPage,
  LoginPage,
  NotFoundPage,
  ReportFormModal,
  RequireEditForm,
  RequireLicenseForm,
  WardBoardListPage,
} from '@/pages';
import AdminAdvertisingTypeListPage from '@/pages/admin/advertysing-type/AdminAdvertysingTypeListPage';
import AdminBoardLocationPage from '@/pages/admin/board/AdminBoardLocationPage';
import AdminReportChart from '@/pages/admin/chart-report/AdminReportChart';
import AdminDistrictManagementPage from '@/pages/admin/district/AdminDistrictManagementPage';
import AdminLicensesListPage from '@/pages/admin/liscense-list/AdminLiscenseListPage';
import AdminLocationListPage from '@/pages/admin/location/AdminLocationListPage';
import AdminWardPage from '@/pages/admin/ward/AdminWardPage';
import LicensesListPage from '@/pages/admin/ward/liscense-list/LiscenseListPage';
import WardLocationListPage from '@/pages/admin/ward/ward-location-list/WardLocationListPage';
import ReportListPage from '@/pages/wards/ReportListPage';
// import CityDistrictManagementPage from '@/pages/city/district';
// import EditDistrict from '@/pages/city/district/[slug]';
// import CityWardManagementPage from '@/pages/city/ward';
import CreateAccountDistrict from '@/pages/admin/createAccount/CreateAccountDistrict';
import CreateAccountWard from '@/pages/admin/createAccount/CreateAccountWard';
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
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdminRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <WardBoardListPage /> },
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
              { path: `${MY_ROUTE.WARD.REQUIRE}/:id`, element: <RequireEditForm /> },
              { path: MY_ROUTE.COMPANY_DETAIL, element: <CompanyDetailForm /> },
              { path: MY_ROUTE.WARD.LICENSE, element: <LicensesListPage /> },
              // { path: MY_ROUTE.DISTRICT, element: <DistrictManagementPage /> },
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdminRequiredEditPage /> },
              { path: `${MY_ROUTE.WARD.BOARD}/:id`, element: <WardBoardListPage /> },
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
              { path: MY_ROUTE.ADS.REQUIRE_EDIT, element: <AdminRequiredEditPage /> },
              { path: MY_ROUTE.ADS.LOCATION, element: <WardBoardListPage /> },
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
              { path: MY_ROUTE.ADVERTISING_TYPE.self, element: <AdminAdvertisingTypeListPage /> },
              { path: MY_ROUTE.REQUIRE_EDIT, element: <AdminRequiredEditPage /> },
              {
                path: `${MY_ROUTE.DISTRICT}/${MY_ROUTE.WARD.self}/:id`,
                element: <AdminWardPage />,
              },
              { path: MY_ROUTE.REPORT_CHART, element: <AdminReportChart /> },
              { path: MY_ROUTE.LICENSES, element: <AdminLicensesListPage /> },
              { path: MY_ROUTE.ACCOUNT.DISTRICT, element: <CreateAccountDistrict /> },
              { path: MY_ROUTE.ACCOUNT.WARD, element: <CreateAccountWard /> },
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
