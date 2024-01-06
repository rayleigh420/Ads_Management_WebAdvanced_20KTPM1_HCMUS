export interface ReportReqBody {
  reportType: number;
  reportForm: number;
  fullname: string;
  email?: string;
  phoneNumber: string;
  content: string;
}
