import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modification_request', { schema: 'ads_management' })
export class ModificationRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'new_location_id' })
  newLocationId: number;

  @Column('datetime', { name: 'request_time' })
  requestTime: Date;

  @Column('text', { name: 'reason' })
  reason: string;

  @Column('int', { name: 'officer_id' })
  officerId: number;
}
