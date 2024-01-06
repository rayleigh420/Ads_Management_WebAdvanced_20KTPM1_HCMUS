import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdvertisingLocation } from "./AdvertisingLocation";
import { Report } from "./Report";

@Index("advertising_board_location_id_foreign", ["locationId"], {})
@Entity("advertising_board", { schema: "ads_management" })
export class AdvertisingBoard {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "location_id", unsigned: true })
  locationId: number;

  @Column("int", { name: "board_type" })
  boardType: number;

  @Column("int", { name: "quantity", default: () => 1 })
  quantity: number;

  @Column("text", { name: "image1", nullable: true })
  image1: string | null;

  @Column("date", { name: "expireDate" })
  expireDate: string;

  @Column("float", { name: "width", nullable: true, precision: 12 })
  width: number | null;

  @Column("float", { name: "height", nullable: true, precision: 12 })
  height: number | null;

  @Column("text", { name: "image2", nullable: true })
  image2: string | null;

  @ManyToOne(
    () => AdvertisingLocation,
    (advertisingLocation) => advertisingLocation.advertisingBoards,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "location_id", referencedColumnName: "id" }])
  location: AdvertisingLocation;

  @OneToMany(() => Report, (report) => report.board)
  reports: Report[];
}
