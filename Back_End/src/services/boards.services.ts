// import { Board } from "../entities/board.entity";
import { myDataSource } from '../orm/connectDb';
import { AdvertisingBoard } from '../orm/entities/AdvertisingBoard';
import { District } from '../orm/entities/District';

class BoardService {
  private boardRepository = myDataSource.getRepository(AdvertisingBoard);

  public async getBoards({ limit, skip }: { limit: number; skip: number }) {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      // .leftJoinAndSelect('location.district', 'district')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }
}

export default new BoardService();
