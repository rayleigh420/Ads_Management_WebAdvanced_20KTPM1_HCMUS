import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_form', { schema: 'ads_management' })
export class ReportForm {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;
}
