import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  describe('when the request is invalid', function () {
    it('should return status 400 and an error message when no email is provided', async function () {
      const httpRequestBody = loginMock.noUsernameLogin;
      
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

    it ('should return status 401 and an error message when the username is not found', async function () {
      const httpRequestBody = loginMock.notExistingUserLogin;
      sinon.stub(UserModel, 'findOne').resolves(null);

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body.message).to.equal('Username or password invalid');
    });

    it ('should return status 401 and an error message when the user exist but password is invalid', async function () {
      const httpRequestBody = loginMock.userWithInvalidPassword;
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body.message).to.equal('Username or password invalid');
    });
  });
  describe('when the request is valid', function () {
    it('should return status 200 and a token when the user exists and password is valid', async function () {
      const httpRequestBody = loginMock.validLogin;
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.property('token');
    })
  });

});
