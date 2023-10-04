import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import jwt from 'jsonwebtoken';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import { sequelize } from '../../../src/services/orders.service';
chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  describe('when the order is valid', function () {
    it('should return 201, create the order and return it, and update the products', async function () {
      sinon.stub(jwt, 'verify').resolves({ id: 1 });
      sinon.stub(sequelize, 'transaction').resolves();
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      const mockCreateReturn = OrderModel.build(orderMock.validOrderFromDB);
      sinon.stub(OrderModel, 'create').resolves(mockCreateReturn);

      const mockFindAllByOrderIdReturn = [ProductModel.build(productMock.validProduct), ProductModel.build(productMock.validProduct2)];
      sinon.stub(ProductModel, 'findAll').resolves(mockFindAllByOrderIdReturn);

      const mockPromiseAllReturn = [ProductModel.build(productMock.updatedValidProduct), ProductModel.build(productMock.updatedValidProduct2)];
      sinon.stub(Promise, 'all').resolves(mockPromiseAllReturn);

      const response = await chai.request(app).post('/orders').send(orderMock.validBodyOrder).set('Authorization', 'genericToken');

      expect(response).to.have.status(201);
      expect(response.body).to.deep.equal(orderMock.validBodyOrder);
    });
  })

  describe('when the order is invalid', function () {

    it('should return 404 and an error message when the user does not exist', async function () {
      sinon.stub(jwt, 'verify').resolves({ id: 1 });
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').onCall(0).resolves(mockFindOneReturn).onCall(1).resolves(undefined);

      const response = await chai.request(app).post('/orders').send(orderMock.invalidBodyUser).set('Authorization', 'genericToken');

      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('"userId" not found');
    });

  })
});
