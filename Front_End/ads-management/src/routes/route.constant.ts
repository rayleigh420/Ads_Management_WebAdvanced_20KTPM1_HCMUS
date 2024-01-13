export const MY_ROUTE = {
  HOME: '',
  REPORT: 'report',
  REQUIRE_LISENCE: 'require',
  COMPANY_DETAIL: 'company/:id',
  LOGIN: '/login',
  DISTRICT: 'district',
  DISTRICT_EDIT: 'district/:id',
  ADVERTISING_TYPE: {
    self: 'advertising-type',
    detail: (id: string) => `advertising-type/${id}`,
  },
  REQUIRE_EDIT: 'require-list',
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
    REQUIRE: `/ward/ads/location/require`,
    REQUIRE_EDIT: (id: string) => `/ward/ads/location/require/${id}`,
    BOARD: `/ward/ads/boards`,
    BOARD_DETAIL: (id: string) => `ward/ads/boards/${id}`,
    LICENSE: 'ward/license',
  },
};

export const DEFAULT_ROUTE = MY_ROUTE.HOME;
