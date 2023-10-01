import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return status 200 and an array of orders with products', async function () {
    const mockFindAllOrdersReturn = [OrderModel.build(orderMock.validOrderFromDB), OrderModel.build(orderMock.validOrderFromDB2)];
    const mockFindAllProductsReturn = [ProductModel.build(productMock.validProduct), ProductModel.build(productMock.validProduct2), ProductModel.build(productMock.validProduct3)];
    sinon.stub(OrderModel, 'findAll').resolves(mockFindAllOrdersReturn);
    sinon.stub(ProductModel, 'findAll').resolves(mockFindAllProductsReturn);
    sinon.stub(Promise, 'all').resolves(orderMock.ordersWithProducts);

    const response = await chai.request(app).get('/orders');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(orderMock.ordersWithProducts);
  });

});
