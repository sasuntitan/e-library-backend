import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

import { ICategory } from '../models/category.model';

@Entity()
export class CategoryEntity extends BaseEntity implements ICategory {
  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  constructor(data: ICategory) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
