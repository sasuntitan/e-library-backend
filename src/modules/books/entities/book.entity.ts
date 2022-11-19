import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  constructor(data?: Partial<BookEntity>, categories?: CategoryEntity[]) {
    super();
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.author = data.author;
      this.categories = categories;
    }
  }
}
