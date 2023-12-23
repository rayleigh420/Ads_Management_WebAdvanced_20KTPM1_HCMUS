import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DepartmentOfficier } from './DepartmentOfficier'
import { DistrictOfficier } from './DistrictOfficier'
import { RefreshToken } from './RefreshToken'
import { Role } from './Role'
import { WardOfficier } from './WardOfficier'

@Index('role_id', ['roleId'], {})
@Entity('user', { schema: 'ads_management' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'email', length: 50 })
  email: string

  @Column('varchar', { name: 'password', length: 255 })
  password: string

  @Column('varchar', { name: 'phone_number', nullable: true, length: 12 })
  phoneNumber: string | null

  @Column('date', { name: 'date_of_birth' })
  dateOfBirth: string

  @Column('int', { name: 'auth_provider', nullable: true })
  authProvider: number | null

  @Column('int', { name: 'role_id', unsigned: true })
  roleId: number

  @OneToMany(() => DepartmentOfficier, (departmentOfficier) => departmentOfficier.user)
  departmentOfficiers: DepartmentOfficier[]

  @OneToMany(() => DistrictOfficier, (districtOfficier) => districtOfficier.user)
  districtOfficiers: DistrictOfficier[]

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[]

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role

  @OneToMany(() => WardOfficier, (wardOfficier) => wardOfficier.user)
  wardOfficiers: WardOfficier[]
}
