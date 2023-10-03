import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  describe('when the request is invalid', function () {
    it('should return status 400 and an error message when no email is provided', async function () {
      const httpRequestBody = loginMock.noEmailLogin;
      
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body.message).to.equal('"username" and "password" are required');
    });

    it ('should return status 400 and an error message when no password is provided', async function () {
      const httpRequestBody = loginMock.noPasswordLogin;

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body.message).to.equal('"username" and "password" are required');
    });
    
  });
});
