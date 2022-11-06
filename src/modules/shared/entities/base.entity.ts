import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
