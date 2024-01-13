export interface ReportReqBody {
  reportType: number;
  locationId?: number;
  boardId?: number;
  reportForm: number;
  fullname: string;
  email?: string;
  phoneNumber: string;
  content: string;
  address: string;
  lat: string;
  long: string;
  districtName: string;
  wardName: string;
  deviceId: string;
}

export interface UpdateReportBody {
  id: number;
  status: number;
  handleMethod: string;
}
