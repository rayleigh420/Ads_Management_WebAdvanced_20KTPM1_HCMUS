export interface ReportStatResponse {
  currentYear: number;
  availableYears: number[];
  monthlyStats: MonthlyStat[];
}

export interface MonthlyStat {
  month: string;
  numberOfReport: number;
}
