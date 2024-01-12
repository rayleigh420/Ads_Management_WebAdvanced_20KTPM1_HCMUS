import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AdvertisingBoard } from './AdvertisingBoard'
import { Ward } from './Ward'
import { ModificationRequest } from './ModificationRequest'
import { Report } from './Report'

@Index('advertising_location_ward_id_foreign', ['wardId'], {})
@Entity('advertising_location', { schema: 'ads_management' })
export class AdvertisingLocation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'lat', length: 20 })
  lat: string

  @Column('varchar', { name: 'long', length: 20 })
  long: string

  @Column('int', { name: 'location_type', default: () => "'0'" })
  locationType: number

  @Column('int', { name: 'advertising_type', default: () => "'0'" })
  advertisingType: number

  @Column('text', { name: 'image1', nullable: true })
  image1: string | null

  @Column('tinyint', { name: 'is_planned', default: () => "'1'" })
  isPlanned: number

  @Column('int', { name: 'ward_id', unsigned: true })
  wardId: number

  @Column('varchar', { name: 'address', nullable: true, length: 250 })
  address: string | null

  @Column('text', { name: 'image2', nullable: true })
  image2: string | null

  @OneToMany(() => AdvertisingBoard, (advertisingBoard) => advertisingBoard.location)
  advertisingBoards: AdvertisingBoard[]

  @ManyToOne(() => Ward, (ward) => ward.advertisingLocations, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'ward_id', referencedColumnName: 'id' }])
  ward: Ward

  @OneToMany(() => ModificationRequest, (modificationRequest) => modificationRequest.newLocation)
  modificationRequests: ModificationRequest[]

  @OneToMany(() => Report, (report) => report.location)
  reports: Report[]
}
