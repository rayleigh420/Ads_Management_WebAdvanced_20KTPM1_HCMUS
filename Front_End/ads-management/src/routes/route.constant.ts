export const MY_ROUTE = {
  HOME: '',
  REPORT: 'report',
  REQUIRE_LISENCE: 'require',
  REQUIRE_EDIT: 'require/:id',
  COMPANY_DETAIL: 'company/:id',
  LOGIN: '/login',
  DISTRICT: 'district',
  DISTRICT_EDIT: 'district/:id',
  ADS: {
    self: 'ads',
    detail: (id: string) => `ads/${id}`,
    REQUIRE_EDIT: 'ads/required-edit',
    LOCATION: 'ads/location',
    BOARD: 'ads/boards',
    BOARD_DETAIL: (id: string) => `ads/boards/${id}`,
  },
  WARD: {
    self: 'ward',
    detail: (id: string) => `ward/${id}`,
    REPORT: `/ward/reports`,
    REPORT_DETAIL: (id: string) => `/ward/reports/${id}`,
  },
};

export const DEFAULT_ROUTE = MY_ROUTE.HOME;
