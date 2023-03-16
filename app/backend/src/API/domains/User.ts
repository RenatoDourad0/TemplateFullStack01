import type IUser from '../interfaces/IUser';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../errors';

export default class User implements IUser {
  readonly id: string | undefined;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly password: string;

  constructor(user: IUser) {
    this.id = this.setId(user);
    this.firstName = this.setFirstName(user.firstName);
    this.lastName = this.setLastName(user.lastName);
    this.email = this.setEmail(user.email);
    this.password = this.setPassword(user.password);
  }

  private readonly setId = (user: IUser): string | undefined => {
    if (isValidObjectId(user._id)) return user._id as any as string;
    throw new BadRequestError('Id inválido ou inexistente');
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
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    if (regex.test(pass)) return pass;
    throw new BadRequestError('senha inválida');
  };
}
