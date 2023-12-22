import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('license_request', { schema: 'ads_management' })
export class LicenseRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'advertising_board_id' })
  advertisingBoardId: number

  @Column('varchar', { name: 'email_of_company', length: 50 })
  emailOfCompany: string

  @Column('varchar', { name: 'phone_number_of_company', length: 12 })
  phoneNumberOfCompany: string

  @Column('varchar', { name: 'address_of_company', length: 200 })
  addressOfCompany: string

  @Column('date', { name: 'start_date' })
  startDate: string

  @Column('date', { name: 'end_date' })
  endDate: string

  @Column('int', { name: 'status' })
  status: number

  constructor(init?: Partial<LicenseRequest>) {
    Object.assign(this, init)
  }
}
