import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DistrictOfficier } from "./DistrictOfficier";
import { Ward } from "./Ward";

@Entity("district", { schema: "ads_management" })
export class District {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @OneToMany(
    () => DistrictOfficier,
    (districtOfficier) => districtOfficier.manageDistrict
  )
  districtOfficiers: DistrictOfficier[];

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}
