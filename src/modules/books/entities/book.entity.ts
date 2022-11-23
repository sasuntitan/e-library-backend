import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

import { UserBookEntity } from './user-book.entity';
import { ReviewEntity } from 'src/modules/reviews/entities/review.entity';

@Entity()
export class BookEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  author: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  count: number;

  @Column({ nullable: true })
  pictureUrl?: string;

  @ManyToMany(() => CategoryEntity, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => UserBookEntity, (bookToUser) => bookToUser.book)
  public userBooks!: UserBookEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.book)
  reviews: ReviewEntity[];

  constructor(data?: Partial<BookEntity>, categories?: CategoryEntity[]) {
    super();
    if (data) {
      this.title = data.title;
      this.description = data.description;
      this.author = data.author;
      this.categories = categories;
      this.pictureUrl = data.pictureUrl;
    }
  }
}
