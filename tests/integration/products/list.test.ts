import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return status 200 and an array of products', async function () {
    const mockFindAllReturn = [ProductModel.build(productMock.validProduct)];
    sinon.stub(ProductModel, 'findAll').resolves(mockFindAllReturn);
    const response = await chai.request(app).get('/products');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([productMock.validProduct]);
  });

});