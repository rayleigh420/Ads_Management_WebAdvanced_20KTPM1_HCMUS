// import { Board } from "../entities/board.entity";
import { ReportReqBody } from '../models/requets/report.request';
import { myDataSource } from '../orm/connectDb';
import { Report } from '../orm/entities/Report';

class BoardService {
  private reportRepository = myDataSource.getRepository(Report);

  public async createReport(payload: ReportReqBody) {
    console.log(payload);

    const report = new Report();
    report.reportType = payload.reportType;
    report.fullnameOfReporter = payload.fullname;
    report.emailOfReporter = payload.email;
    report.phoneNumberOfReporter = payload.phoneNumber;
    report.content = payload.content;

    return await this.reportRepository.save(report);
  }
}

export default new BoardService();
