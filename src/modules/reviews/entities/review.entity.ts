import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';

@Entity()
export class ReviewEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  review: string;

  @Column()
  bookId!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.reviews)
  book: BookEntity;

  constructor(data?: Partial<ReviewEntity>) {
    super();
    if (data) {
      this.id = data.id;
      this.review = data.review;
    }
  }
}
