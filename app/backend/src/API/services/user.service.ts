import bcrypt from 'bcryptjs';
import User from '../domains/User';
import { NotFoundError } from '../errors';
import type IUser from '../interfaces/IUser';
import type AbstractODM from '../models/AbstractODM';
import UserODM from '../models/UserODM';

export default class UserService {
  constructor(private readonly model: AbstractODM<IUser> = new UserODM()) {}

  private createUserDomain(user: IUser | null): User | null {
    if (user != null) {
      const newUser = new User(user);
      return newUser;
    }
    throw new NotFoundError('Dados do usuário inexistentes');
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findByField({ email });
    return this.createUserDomain(user);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.model.findById(id);
    return this.createUserDomain(user);
  }

  public async create(data: IUser): Promise<User | null> {
    const newEntity = this.createUserDomain(data) as User;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newEntity.password, salt);
    const encrypted = { ...newEntity, password: hashedPassword };
    const user = await this.model.create(encrypted);
    return this.createUserDomain(user);
  }
}
