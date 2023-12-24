import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdvertisingLocation } from './AdvertisingLocation';

@Index('advertising_board_location_id_foreign', ['locationId'], {})
@Entity('advertising_board', { schema: 'ads_management' })
export class AdvertisingBoard {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'location_id', unsigned: true })
  locationId: number;

  @Column('varchar', { name: 'size', nullable: true, length: 20 })
  size: string | null;

  @Column('int', { name: 'board_type' })
  boardType: number;

  @Column('int', { name: 'image_id', nullable: true, unsigned: true })
  imageId: number | null;

  @Column('date', { name: 'expireDate' })
  expireDate: string;

  @ManyToOne(() => AdvertisingLocation, (advertisingLocation) => advertisingLocation.advertisingBoards, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: AdvertisingLocation;
}
