import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from '../entities/base.entity';

export abstract class BaseService<E extends BaseEntity> {
  constructor(protected readonly repository: Repository<E>) {}

  public async findOne(params: FindOptionsWhere<E>): Promise<E> {
    return this.repository.findOne({
      where: params,
    });
  }

  public async findAll(
    params?: Partial<E>,
    relations?: string[],
  ): Promise<E[]> {
    return this.repository.find({
      ...params,
      relations,
    });
  }

  public async findById(id: number): Promise<E> {
    return this.repository.findOneBy({
      id,
    } as FindOptionsWhere<E>);
  }

  public async add(data: E): Promise<E> {
    return this.repository.save(data);
  }

  public async update(
    id: number,
    data: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
