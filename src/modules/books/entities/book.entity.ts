import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { IBook } from '../models/book.model';

@Entity()
export class BookEntity extends BaseEntity implements IBook {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  author: string;

  constructor(data: IBook) {
    super();
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.author = data.author;
    }
  }
}
