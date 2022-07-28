const saleModel = require('../models/saleModel');
const { getProductById } = require('../models/productModel');
const NotFoundError = require('../errors/NotFoundError');

const saleService = {
  async checkIfProductsExists(salesList) {
    await Promise.all(salesList.map(async ({ productId }) => {
      const exists = await getProductById(productId);
      if (!exists) throw new NotFoundError('Product not found');
      return false;
    }));
  },

  async checkIfSaleExists(saleId) {
    const [exists] = await saleModel.getSaleById(saleId);
    console.log(!exists);
    if (!exists) throw new NotFoundError('Sale not found');
    return false;
  },

  async addSale() {
    const saleId = await saleModel.addSale();
    return saleId;
  },

  async addSaleProduct(saleId, products) { 
    const saleProductId = await Promise.all(products.map(async ({ productId, quantity }) => {
      await saleModel.addSaleProduct(saleId, productId, quantity);
    }));
    return saleProductId;
  },

  async listSales() {
    const sales = await saleModel.listSales();
    return sales;
  },

  async getSaleById(saleId) {
    const sale = await saleModel.getSaleById(saleId);
    return sale;
  },
};

module.exports = saleService;
