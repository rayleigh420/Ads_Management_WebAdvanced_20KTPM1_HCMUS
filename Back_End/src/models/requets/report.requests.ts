export interface ReportReqBody {
  reportType: number;
  fullname: string;
  email?: string;
  phoneNumber: string;
  content: string;
}
