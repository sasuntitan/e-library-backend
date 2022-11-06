import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books: BookEntity[];

  constructor(data: Partial<CategoryEntity>) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
