import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

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

  @Column({ default: 0 })
  @IsNotEmpty()
  holdCount: number;

  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category: CategoryEntity;

  constructor(data?: Partial<BookEntity>) {
    super();
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.author = data.author;
    }
  }
}
