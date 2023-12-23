import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('role', { schema: 'ads_management' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'role_name', length: 50 })
  roleName: string

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}
