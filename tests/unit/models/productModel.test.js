const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const db = require('../../../models/db');
const productModel = require('../../../models/productModel');

use(chaiAsPromised);

describe('productModel', () => {
  describe('#listProducts', () => {
    describe('When there is products', () => {
      before(() => {
        const execute = [
          [{
            "id": 1,
            "name": "produto A"
          }]
        ];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('Not return a empty list', async () => {
        const products = await productModel.listProducts();
        expect(products).to.be.not.empty;
      });
      it('The list has items of type object', async () => {
        const [item] = await productModel.listProducts();
        expect(item).to.be.an('object');
      });
      it('the items have properties: id, name', async () => {
        const [item] = await productModel.listProducts();
        expect(item).to.include.all.keys(
          'id',
          'name',
        )
      });
    });
    describe('When there is not products', () => {
      before(() => {
        const execute = [
          []
        ];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('return a empty list', async () => {
        const products = await productModel.listProducts();
        expect(products).to.be.empty;
      });
    });
    // describe('When not exist products', () => {});
  });
  describe('#productExists', () => {
    const ID = 2;
    describe('when exist the ID in the database', () => {
      before(() => {
        const execute = [
          [{
            "id": 2,
            "name": "Traje de encolhimento",
          }]
        ];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('The return of function is an object', async () => {
        const product = await productModel.productExists(ID);
        expect(product).to.be.eq(true);
      });
    });
    describe('when not exist the ID in the database', () => {
      before(() => {
        const execute = [
          []
        ];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('The return of function is undefined', async () => {
        const product = await productModel.productExists(ID);
        expect(product).to.be.eq(false);
      });
    });
  });
  describe('#getProductById', () => {
    const ID = 2;
    describe('When the product ID is registered in the database', () => {
      before(() => {
        const execute = [[{
          "id": 2,
          "name": "Traje de encolhimento",
        }]];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('The return of function is an object', async () => {
        const product = await productModel.getProductById(ID);
        expect(product).to.be.an('object');
      });
      it('the items have properties: id, name', async () => {
        const product = await productModel.getProductById(ID);
        expect(product).to.include.all.keys(
          'id',
          'name',
        )
      });
    });
    describe('when the  ID is not valid', () => {
      before(() => {
        const execute = [[]];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('The return of function is undefined', async () => {
        const product = await productModel.getProductById(ID);
        expect(product).to.be.an('undefined');
      });
    });
  });
  describe('#addProduct', () => {
    describe('When creating a product in the database successfully', () => {
      const payload = {
        name: 'produto',
      };
      before(() => {
        const execute = [{ insertId: 3 }];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('Return is of type number', async () => {
        const insertId = await productModel.addProduct(payload);
        expect(insertId).to.be.an('number');
      });
    });
    describe('When an empty object is passed', () => {
      const payload = {};
      before(async () => {
        const execute = [[]];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(async () => {
        db.query.restore();
      });

      it('The function return is undefined', async () => {
        const response = await productModel.addProduct(payload);
        expect(response).to.be.an('undefined');
      });
    });
  });
  describe('#updateProduc', () => {
    const ID = 2;
    const payload = {name: 'Quentin Tarantino'};
    before(() => {
      const execute = [{ affectedRows: 1}];
      sinon.stub(db, 'query').resolves(execute);
    });
    after(() => {
      db.query.restore();
    });
    it('Should be able to edit if send an id and an object', async function () {
      const value = await productModel.updateProduct(ID, payload);
      expect(value).to.be.eq(1);
    });
  });
  describe('#deleteProduct', () => {
    describe('when an ID valid is passed', () => {
      const ID = 2;
      before(() => {
        const execute = [{
          affectedRows: 1
        }];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('Should be able delete a product in database if passed an ID', async function () {
        const value = await productModel.updateProduct(ID);
        expect(value).to.be.eq(1);
      });
    });
    describe('when an ID invalid is passed', () => {
      const ID = 2;
      before(() => {
        const execute = [{
          affectedRows: 0
        }];
        sinon.stub(db, 'query').resolves(execute);
      });
      after(() => {
        db.query.restore();
      });
      it('Should be able delete a product in database if passed an ID', async function () {
        const value = await productModel.updateProduct(ID);
        expect(value).to.be.eq(0);
      });
    });
  });
});
