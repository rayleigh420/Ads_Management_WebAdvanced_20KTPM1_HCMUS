import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AdvertisingBoard } from './AdvertisingBoard'
import { AdvertisingLocation } from './AdvertisingLocation'

@Index('modification_request_FK', ['boardId'], {})
@Index('modification_request_FK_1', ['newLocationId'], {})
@Entity('modification_request', { schema: 'ads_management' })
export class ModificationRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'new_location_id', unsigned: true, nullable: true })
  newLocationId: number | null

  @Column('datetime', { name: 'request_time' })
  requestTime: Date

  @Column('text', { name: 'reason' })
  reason: string

  @Column('int', { name: 'officer_id', nullable: true })
  officerId: number | null

  @Column('int', { name: 'board_type', nullable: true })
  boardType: number | null

  @Column('float', { name: 'width', nullable: true, precision: 12 })
  width: number | null

  @Column('float', { name: 'height', nullable: true, precision: 12 })
  height: number | null

  @Column('varchar', { name: 'lat', nullable: true, length: 20 })
  lat: string | null

  @Column('varchar', { name: 'long', nullable: true, length: 20 })
  long: string | null

  @Column('varchar', { name: 'address', nullable: true, length: 100 })
  address: string | null

  @Column('int', { name: 'board_id', nullable: true, unsigned: true })
  boardId: number | null

  @ManyToOne(() => AdvertisingBoard, (advertisingBoard) => advertisingBoard.modificationRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: AdvertisingBoard

  @ManyToOne(() => AdvertisingLocation, (advertisingLocation) => advertisingLocation.modificationRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'new_location_id', referencedColumnName: 'id' }])
  newLocation: AdvertisingLocation
}
