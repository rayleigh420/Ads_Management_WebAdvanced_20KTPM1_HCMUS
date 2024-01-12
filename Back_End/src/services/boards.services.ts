// import { Board } from "../entities/board.entity";
import { BoardReqBody } from '../models/requets/admin.requests'
import { myDataSource } from '../orm/connectDb'
import { AdvertisingBoard } from '../orm/entities/AdvertisingBoard'
import { District } from '../orm/entities/District'

class BoardService {
  private boardRepository = myDataSource.getRepository(AdvertisingBoard)

  public async getBoards({ limit, skip }: { limit: number; skip: number }) {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      // .leftJoinAndSelect('location.district', 'district')
      .skip(skip)
      .take(limit)
      .getManyAndCount()
  }

  public async getBoardById(id: number) {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .where('board.id = :id', { id })
      .getOne()
  }

  public async getListBoard(id: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .where('location.id = :id', { id })
      .getMany()
  }

  public async createBoard(board: BoardReqBody) {
    return this.boardRepository.save(board)
  }

  public async updateBoard(id: number, board: BoardReqBody) {
    const _board = await this.boardRepository.findOneBy({ id })
    _board.locationId = board.locationId
    _board.boardType = board.boardType
    _board.quantity = board.quantity
    _board.image1 = board?.image1
    _board.expireDate = board.expireDate
    _board.width = board?.width
    _board.height = board?.height
    _board.image2 = board?.image2

    return this.boardRepository.save(_board)
  }

  public async deleteBoard(id: number) {
    return this.boardRepository.delete({ id })
  }

  public async getAllBoardManageWard(wardId: number) {
    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.location', 'location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('ward.id = :wardId', { wardId })
      // .where('reports.deviceId = :deviceId', { deviceId })
      .getMany()
    return boards
  }
}

export default new BoardService()
