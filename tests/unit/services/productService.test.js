const sinon = require('sinon');
const { expect } = require('chai');
const NotFoundError = require('../../../errors/NotFoundError');
// const chaiAsPromised = require('chai-as-promised');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

// use(chaiAsPromised);

describe('productService', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('#validateProductBody', () => {
    it('se mandar um objeto válido deve retonar um objeto válido', async () => {
      const object = await productService.validateProductBody({ name: 'Quentin Tarantino' });
      expect(object).to.be.deep.eq({
        name: 'Quentin Tarantino'
      });
    });

    it('se mandar um nome vazio no body deve disparar um erro', async () => {
      expect(() => productService.validateProductBody({
          name: ''
        })).to
        .throws('"name" is not allowed to be empty');
    });

    it('se mandar um objeto sem nome no body deve disparar um erro', async () => {
      expect(() => productService.validateProductBody({})).to
        .throws('"name" is required');
    });
  });
  describe('#checkIfProductExists', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('when passing an id that exists', async () => {
      sinon.stub(productModel, 'productExists').resolves(true);
      const exists = await productService.checkIfProductExists(1);
      expect(exists).to.be.eq(true);
    });
    // it('when passing an id that does not exist', async () => {
    //   sinon.stub(productModel, 'productExists').resolves(false);
    //   const exists = await productService.checkIfProductExists(101);
    //   expect(exists).to.be.rejectedWith(NotFoundError);
    // });
  });
  describe('#getProductById', () => {
    it('When the product ID is registered in the database', async () => {
      const execute = {
        "id": 2,
        "name": "Traje de encolhimento",
      }
      sinon.stub(productModel, 'getProductById').resolves(execute);
      const product = await productService.getProductById(2);
      expect(product).to.be.deep.eq(execute);
    });
    it('The return of function is undefined', async () => {
      const execute = undefined;
      sinon.stub(productModel, 'getProductById').resolves(execute);
      const product = await productService.getProductById(200);
      expect(product).to.be.an('undefined');
    });
  });
  describe('#listProducts', () => {
    it('When there is products', async () => {
      const execute = [{
        "id": 2,
        "name": "Traje de encolhimento",
      }];
      sinon.stub(productModel, 'listProducts').resolves(execute);
      const [product] = await productService.listProducts();
        expect(product).to.include.all.keys(
          'id',
          'name',
        )
    });
    it('When there is not products', async () => {
      const execute = [];
      sinon.stub(productModel, 'listProducts').resolves(execute);
      const product = await productService.listProducts();
      expect(product).to.be.empty;
    });
  });
  describe('#addProduct', () => {
    it('When creating a product in the database successfully', async () => {
      const payload = { name: 'martelo de thor' }
      const resolves = 4;
      sinon.stub(productModel, 'addProduct').resolves(resolves);
      const product = await productService.addProduct(payload);
      expect(product).to.be.eq(resolves)
    });
    it('When an empty object is passed', async () => {
      const payload = {}
      const resolves = undefined;
      sinon.stub(productModel, 'addProduct').resolves(resolves);
      const product = await productService.addProduct(payload);
      expect(product).to.be.an('undefined');
    });
  });
  describe('#updateProduct', () => {
    it('When creating a product in the database successfully', async () => {
      sinon.stub(productModel, 'updateProduct').resolves(1);
      const updated = await productService.updateProduct(4, { name: 'martelo de thor' });
      expect(updated).to.include.all.keys(
       'id',
       'name',
      )
    });
    it('When an empty object is passed', async () => {
      sinon.stub(productModel, 'updateProduct').resolves(1);
      const updated = await productService.updateProduct(4, {
        name: 'martelo de thor'
      });
      expect(updated).to.include.all.keys(
        'id',
        'name',
      )
    });
  });
  describe('#deleteProduct', () => {
    it('When deleting a product in the database successfully', async () => {
      sinon.stub(productModel, 'deleteProduct').resolves(1);
      const deleted = await productService.deleteProduct(4);
      expect(deleted).to.be.eq(1)
    });
    // it('When an ID invalid is passed', async () => {
    //   sinon.stub(productModel, 'deleteProduct').resolves(undefined);
    //   const deleted = await productService.deleteProduct(242);
    //   expect(deleted).to.be.eq(1)
    //   expect(product).to.be.an('undefined');
    // });
  });
});
