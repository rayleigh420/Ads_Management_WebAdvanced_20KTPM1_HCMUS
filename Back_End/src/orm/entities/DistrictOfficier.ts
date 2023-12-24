import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { District } from './District';

@Index('district_officier_FK', ['userId'], {})
@Index('district_officier_manage_district_id_foreign', ['manageDistrictId'], {})
@Entity('district_officier', { schema: 'ads_management' })
export class DistrictOfficier {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'manage_district_id', unsigned: true })
  manageDistrictId: number;

  @ManyToOne(() => User, (user) => user.districtOfficiers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => District, (district) => district.districtOfficiers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'manage_district_id', referencedColumnName: 'id' }])
  manageDistrict: District;
}
