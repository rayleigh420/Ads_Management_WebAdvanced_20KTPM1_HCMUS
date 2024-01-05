import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report', { schema: 'ads_management' })
export class Report {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'report_type' })
  reportType: number;

  @Column('varchar', { name: 'fullname_of_reporter' })
  fullnameOfReporter: string;

  @Column('varchar', { name: 'email_of_reporter', nullable: true, length: 50 })
  emailOfReporter: string | null;

  @Column('varchar', { name: 'phone_number_of_reporter', length: 12 })
  phoneNumberOfReporter: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('text', { name: 'image1', nullable: true})
  image1: string | null;

  @Column('text', { name: 'image2', nullable: true})
  image2: string | null;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'udpated_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  udpatedAt: Date;
}
