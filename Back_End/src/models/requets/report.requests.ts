export interface ReportReqBody {
  locationId?: number;
  boardId?: number;
  reportForm: number;
  fullname: string;
  email?: string;
  phoneNumber: string;
  content: string;
}
