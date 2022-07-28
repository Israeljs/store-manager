const { expect, use } = require('chai');
// const { expect } = require('chai');
// const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

// require('express-async-errors');

use(chaiAsPromised);

describe('productController', () => {
  describe('#listProducts', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('When there is products', async () => {
      const req = {};
      const res = {};
      const products = [{
        id: 1,
        name: 'martelo de thor'
      }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'listProducts').resolves(products);

      await productController.listProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });
    it('When there is not products', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'listProducts').resolves([]);

      await productController.listProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
  describe('#getProductById', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('When the product ID is valid', async () => {
      const req = {};
      const res = {};
      const product = {
        id: 1,
        name: 'martelo de thor'
      };

      req.params = { id: 1 };
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'getProductById').resolves(product);

      await productController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.true;
    });
    // it('When there is not products', async () => {
    //   const req = {};
    //   const res = {};

    //   req.params = { id: 1 };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub();

    //   sinon.stub(productService, 'listProducts').resolves([]);

    //   await productController.listProducts(req, res);

    //   expect(res.status.calledWith(200)).to.be.equal(true);
    //   expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    // });
  });
  // describe('', () => { });
  // describe('', () => { });
  // describe('', () => {});
});
// it('', () => { });expect(response.json.calledWith(
