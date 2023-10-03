import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  describe('when the request is valid',async function () {
    it('should return status 201 and the created product', async function () { 
      const mockCreateReturn = ProductModel.build(productMock.validProduct);
      sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
      const response = await chai.request(app).post('/products').send(productMock.validBodyProduct);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(productMock.createdProductReturn);
    });
  });

  // describe('when the request is invalid', async function () {
  //   it('should return status 400 and an error message when no name is provided', async function () {
  //     const response = await chai.request(app).post('/products').send(productMock.noNameProduct);

  //     expect(response.status).to.equal(400);
  //     expect(response.body.message).to.equal('"name" is required');
  //   });
  // });

});
