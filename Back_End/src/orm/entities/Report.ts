import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdvertisingBoard } from "./AdvertisingBoard";
import { AdvertisingLocation } from "./AdvertisingLocation";

@Index("report_FK", ["boardId"], {})
@Index("report_FK_1", ["locationId"], {})
@Entity("report", { schema: "ads_management" })
export class Report {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "fullname_of_reporter", length: 100 })
  fullnameOfReporter: string;

  @Column("varchar", { name: "email_of_reporter", nullable: true, length: 50 })
  emailOfReporter: string | null;

  @Column("varchar", { name: "phone_number_of_reporter", length: 12 })
  phoneNumberOfReporter: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "image1", nullable: true, comment: "toi da 2 hinhn" })
  image1: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "udpated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  udpatedAt: Date;

  @Column("text", { name: "image2", nullable: true })
  image2: string | null;

  @Column("int", { name: "report_form", nullable: true })
  reportForm: number | null;

  @Column("int", { name: "location_Id", nullable: true, unsigned: true })
  locationId: number | null;

  @Column("int", { name: "board_id", nullable: true, unsigned: true })
  boardId: number | null;

  @ManyToOne(
    () => AdvertisingBoard,
    (advertisingBoard) => advertisingBoard.reports,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "board_id", referencedColumnName: "id" }])
  board: AdvertisingBoard;

  @ManyToOne(
    () => AdvertisingLocation,
    (advertisingLocation) => advertisingLocation.reports,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "location_Id", referencedColumnName: "id" }])
  location: AdvertisingLocation;
}
