export const MY_ROUTE = {
  HOME: '',
  REPORT: 'report',
  REQUIRE_LISENCE: 'require',
  REQUIRE_EDIT: 'require/:id',
  COMPANY_DETAIL: 'company/:id',
  LOGIN: '/login',
  DISTRICT: 'district',
  WARD: 'ward',
  DISTRICT_EDIT: 'district/:id',
  ADS: {
    self: 'ads',
    detail: (id: string) => `ads/${id}`,
    REQUIRE_EDIT: 'ads/required-edit',
    LOCATION: 'ads/location',
  },
};

export const DEFAULT_ROUTE = MY_ROUTE.HOME;
