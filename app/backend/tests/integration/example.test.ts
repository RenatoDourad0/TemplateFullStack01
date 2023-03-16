// import 'jest';
// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import { app } from '../app';
// import Example from '../database/models/ExampleModel';
// import { Response } from 'superagent';

// chai.use(chaiHttp);

// describe('Seu teste', () => {
//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(Example, "findOne")
//       .resolves({
//         ...<Seu mock>
//       } as Example);
//   });

//   after(()=>{
//     (Example.findOne as sinon.SinonStub).restore();
//   })

//   it('...', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .post('/')
//       .set('X-API-Key', 'foobar')
//       .send({ text: "teste" })

//     expect(...)
//   });

//   it('Seu sub-teste', () => {
//     expect(false).toBe(false);
//   });
// });
