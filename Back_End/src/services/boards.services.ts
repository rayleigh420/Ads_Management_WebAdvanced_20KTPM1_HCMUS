// import { Board } from "../entities/board.entity";
import { Multer } from 'multer';
import { BoardReqBody } from '../models/requets/admin.requests';
import { myDataSource } from '../orm/connectDb';
import { AdvertisingBoard } from '../orm/entities/AdvertisingBoard';
import { District } from '../orm/entities/District';
import uploadToCloudinary from '../utils/cloudinary.util';

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

  public async getBoardById(id: number) {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .where('board.id = :id', { id })
      .getOne();
  }

  public async getListBoard(id: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .where('location.id = :id', { id })
      .getMany();
  }

  public async createBoard(board: BoardReqBody, images: Express.Multer.File[]) {
    if (!images || images.length === 0) {
      throw new Error('Please upload a file');
    }

    const imageUrls = await Promise.all(images.map(image => uploadToCloudinary(image)));

    // Assuming board has properties image1 and image2 to store the image URLs
    board.image1 = imageUrls[0]?.url;
    board.image2 = imageUrls[1]?.url; // Use optional chaining in case there's only one image

    return this.boardRepository.save(board);
  }
  public async updateBoard(id: number, board: BoardReqBody, images?: Express.Multer.File[]) {
    const _board = await this.boardRepository.findOneBy({ id });

    if (images && images.length > 0) {
      console.log("check file", images);
      const imageUrls = await Promise.all(images.map(image => uploadToCloudinary(image)));
      _board.image1 = imageUrls[0].url;
      _board.image2 = imageUrls[1].url;
    }
    console.log('board',_board);

    _board.locationId = board.locationId;
    _board.boardType = board.boardType;
    _board.quantity = board.quantity;
    _board.expireDate = board.expireDate;
    _board.width = board?.width;
    _board.height = board?.height;

    return this.boardRepository.save(_board);
  }

  public async deleteBoard(id: number) {
    return this.boardRepository.delete({ id });
  }

  public async getAllBoardManageWard(wardId: number) {
    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('ward.id = :wardId', { wardId })
      // .where('reports.deviceId = :deviceId', { deviceId })
      .getMany();
    return boards;
  }
}

export default new BoardService();
