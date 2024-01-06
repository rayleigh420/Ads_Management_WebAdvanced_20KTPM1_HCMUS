// import { Board } from "../entities/board.entity";
import { ReportReqBody } from '../models/requets/report.requests';
import { myDataSource } from '../orm/connectDb';
import { Report } from '../orm/entities/Report';
import uploadToCloudinary from '../utils/cloudinary.util';

class BoardService {
  private reportRepository = myDataSource.getRepository(Report);

  public async createReport(payload: ReportReqBody, file: Express.Multer.File) {

    if (!file) {
      throw new Error('Please upload a file');
    }
    const resultUpload = await uploadToCloudinary(file);

    const report = new Report();
    report.locationId = payload.locationId;
    report.boardId = payload.boardId;
    report.reportForm = payload.reportForm;
    report.fullnameOfReporter = payload.fullname;
    report.emailOfReporter = payload?.email;
    report.phoneNumberOfReporter = payload.phoneNumber;
    report.content = payload.content;
    report.image1 = resultUpload.url;
    return await this.reportRepository.save(report);
  }

  public async getReportAnonymousByLocationId(locationId: number, reportId: number) {
    return await this.reportRepository.find({ where: { locationId, id: reportId } });
  }

  public async getReportAnonymousByBoardId(boardId: number, reportId: number) {
    return await this.reportRepository.find({ where: { boardId, id: reportId } });
  }
}

export default new BoardService();
