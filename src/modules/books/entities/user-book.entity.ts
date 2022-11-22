import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('user-book')
export class UserBookEntity {
  @PrimaryGeneratedColumn()
  public bookToUserId!: number;

  @Column()
  public bookId!: number;

  @Column()
  public userId!: number;

  @ManyToOne(() => BookEntity, (book) => book.userBooks)
  public book!: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.userBooks)
  public user!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  endDate: Date;
}
