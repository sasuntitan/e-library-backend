import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  constructor(data: Partial<CategoryEntity>) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
