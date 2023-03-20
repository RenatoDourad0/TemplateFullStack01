import 'jest';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../../src/API/app';
import { type Response } from 'superagent';
import mongoose, { Model } from 'mongoose';
import type IUser from '@App/API/interfaces/IUser';

chai.use(chaiHttp);

describe('Seu teste', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    const stubHashedPassword = '$2a$10$WLVnW/Gr8ZejSV229KzVJet0t7/hNVaRDEIw21XB9icDGKEwE.aiO';

    const stubToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTMzNTEzMmQwYjI5ZDg1ZDhlY2Q5ZiIsImZpcnN0TmFtZSI6IlJlbmF0byIsImxhc3ROYW1lIjoiY2FtcG9zIiwiZGJNYWlsIjoicmVuYXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3ODk4MDM3MSwiZXhwIjoxNjc5NTg1MTcxfQ.JGMVqJsKrXVVuBtRyMtX-t3i2cd6KLu2g1HdqMxNMpc';

    const stubUser: IUser = {
      _id: new mongoose.Types.ObjectId('6348513f34c397abcad040b2'),
      firstName: 'Renato',
      lastName: 'Dourado',
      email: 'teste@teste.com',
      password: '$2a$10$WLVnW/Gr8ZejSV229KzVJet0t7/hNVaRDEIw21XB9icDGKEwE.aiO',
      __v: 0,
    };

    sinon.stub(bcrypt, 'hashSync').returns(stubHashedPassword);
    sinon.stub(jwt, 'sign').resolves(stubToken);
    sinon.stub(Model, 'create').resolves((stubUser as any as any[]));
    sinon.stub(Model, 'findOne').resolves(stubUser);
  });

  afterEach(() => {
    (Model.findOne as sinon.SinonStub).restore();
    (Model.create as sinon.SinonStub).restore();
    (bcrypt.hashSync as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  });

  it('tests /register endpoit', async () => {
    const output: IUser & { token: string } = {
      id: '6348513f34c397abcad040b2' as any as mongoose.Types.ObjectId,
      firstName: 'Renato',
      lastName: 'Dourado',
      email: 'teste@teste.com',
      password: '$2a$10$WLVnW/Gr8ZejSV229KzVJet0t7/hNVaRDEIw21XB9icDGKEwE.aiO',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTMzNTEzMmQwYjI5ZDg1ZDhlY2Q5ZiIsImZpcnN0TmFtZSI6IlJlbmF0byIsImxhc3ROYW1lIjoiY2FtcG9zIiwiZGJNYWlsIjoicmVuYXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3ODk4MDM3MSwiZXhwIjoxNjc5NTg1MTcxfQ.JGMVqJsKrXVVuBtRyMtX-t3i2cd6KLu2g1HdqMxNMpc',
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login/register')
      .send({
        firstName: 'Renato',
        lastName: 'campos',
        email: 'teste@teste.com',
        password: 'rR1/2/3abc',
      });

    expect(chaiHttpResponse.body).toStrictEqual(output);
  });

  // it('Seu sub-teste', () => {
  //   expect(false).toBe(false);
  // });
});
