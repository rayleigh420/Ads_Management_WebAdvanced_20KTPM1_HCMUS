import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Ward } from "./Ward";

@Index("ward_officier_FK_1", ["manageWardId"], {})
@Index("ward_officier_FK", ["userId"], {})
@Entity("ward_officier", { schema: "ads_management" })
export class WardOfficier {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id", nullable: true, unsigned: true })
  userId: number | null;

  @Column("int", { name: "manage_ward_id", unsigned: true })
  manageWardId: number;

  @ManyToOne(() => User, (user) => user.wardOfficiers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Ward, (ward) => ward.wardOfficiers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "manage_ward_id", referencedColumnName: "id" }])
  manageWard: Ward;
}
