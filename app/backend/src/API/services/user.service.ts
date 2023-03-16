import bcrypt from 'bcryptjs';
import User from '../domains/User';
import type IUser from '../interfaces/IUser';
import type AbstractODM from '../models/AbstractODM';
import UserODM from '../models/UserODM';

export default class UserService {
  constructor(private readonly model: AbstractODM<IUser> = new UserODM()) {}

  private createUserDomain(user: IUser | null): User | null {
    if (user != null) return new User(user);
    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findByField('email', email);
    return this.createUserDomain(user);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.model.findById(id);
    return this.createUserDomain(user);
  }

  public async create(data: IUser): Promise<User | null> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const encrypted = { ...data, password: hashedPassword };
    const user = await this.model.create(encrypted);
    return this.createUserDomain(user);
  }
}
