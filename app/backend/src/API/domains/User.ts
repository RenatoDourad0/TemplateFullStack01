import type IUser from '../interfaces/IUser';
import type mongoose from 'mongoose';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../errors';

export default class User implements IUser {
  readonly id: mongoose.Types.ObjectId | undefined;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly password: string;

  constructor(user: IUser) {
    this.id = this.setId(user._id);
    this.firstName = this.setFirstName(user.firstName);
    this.lastName = this.setLastName(user.lastName);
    this.email = this.setEmail(user.email);
    this.password = this.setPassword(user.password);
  }

  private readonly setId = (id: mongoose.Types.ObjectId | undefined): mongoose.Types.ObjectId | undefined => {
    if ((id != null) && isValidObjectId(id)) return id;
    return undefined;
  };

  private readonly setFirstName = (firstName: string): string => {
    if (firstName && firstName.length > 3) return firstName;
    throw new BadRequestError('nome deve ter mais de 3 letras');
  };

  private readonly setLastName = (Lastname: string): string => {
    if (Lastname && Lastname.length > 5) return Lastname;
    throw new BadRequestError('sobrenome deve ter mais de 5 letras');
  };

  private readonly setEmail = (email: string): string => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(email)) return email;
    throw new BadRequestError('email inválido');
  };

  // At least one digit [0-9]
  // At least one lowercase character [a-z]
  // At least one uppercase character [A-Z]
  // At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\]
  // At least 8 characters in length, but no more than 32.

  private readonly setPassword = (pass: string): string => {
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g;
    if (regex.test(pass)) return pass;
    throw new BadRequestError('senha inválida');
  };
}
