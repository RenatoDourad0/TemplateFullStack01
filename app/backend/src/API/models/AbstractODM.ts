import {
  type Model,
  models,
  type Schema,
  type UpdateQuery,
  model,
  startSession,
} from 'mongoose';
import { BadRequestError } from '../errors';

abstract class AbstractODM<T> {
  protected model: Model<T>;

  protected schema: Schema;

  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: Omit<T, 'id'>): Promise<T> {
    try {
      const newObj = await this.model.create({ ...obj });
      return newObj;
    } catch (error: any) {
      throw new BadRequestError(`falha ao adicionar ao banco: ${(error as Error).message}`);
    }
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    const update: UpdateQuery<T> = { ...obj };
    return this.model.findByIdAndUpdate({ _id }, update, { new: true });
  }

  public async delete(id: string): Promise<void> {
    const session = await startSession();
    session.startTransaction();
    try {
      const deletedUser = await this.model.deleteMany({ id }).session(session);
      if (deletedUser.deletedCount !== 1) {
        await session.abortTransaction();
      } else {
        await session.commitTransaction();
      }
    } catch (err) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  public async findByField(fieldObj: Partial<T>): Promise<T | null> {
    return this.model.findOne(fieldObj);
  }

  public async FindAll(): Promise<T[] | []> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
}

export default AbstractODM;
