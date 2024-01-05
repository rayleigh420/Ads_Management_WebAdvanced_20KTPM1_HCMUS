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
    report.reportType = payload.reportType;
    report.fullnameOfReporter = payload.fullname;
    report.emailOfReporter = payload?.email;
    report.phoneNumberOfReporter = payload.phoneNumber;
    report.content = payload.content;
    report.image1 = resultUpload.url;
    return await this.reportRepository.save(report);
  }
}

export default new BoardService();
