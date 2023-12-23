import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AdvertisingLocation } from './AdvertisingLocation'
import { District } from './District'
import { WardOfficier } from './WardOfficier'

@Index('ward_district_id_foreign', ['districtId'], {})
@Entity('ward', { schema: 'ads_management' })
export class Ward {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'name', length: 50 })
  name: string

  @Column('int', { name: 'district_id', unsigned: true })
  districtId: number

  @OneToMany(() => AdvertisingLocation, (advertisingLocation) => advertisingLocation.ward)
  advertisingLocations: AdvertisingLocation[]

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'district_id', referencedColumnName: 'id' }])
  district: District

  @OneToMany(() => WardOfficier, (wardOfficier) => wardOfficier.manageWard)
  wardOfficiers: WardOfficier[]
}
