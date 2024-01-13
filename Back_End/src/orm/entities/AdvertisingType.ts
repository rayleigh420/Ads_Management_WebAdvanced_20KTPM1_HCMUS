import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('advertising_type', { schema: 'ads_management' })
export class AdvertisingType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;
}
