import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Index('refresh_token_FK', ['userId'], {})
@Entity('refresh_token', { schema: 'ads_management' })
export class RefreshToken {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('text', { name: 'token', nullable: true })
  token: string | null

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number

  @Column('datetime', { name: 'iat', nullable: true })
  iat: Date | null

  @Column('datetime', { name: 'exp', nullable: true })
  exp: Date | null

  @Column('datetime', { name: 'create_at', nullable: true })
  createAt: Date | null

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User
}
