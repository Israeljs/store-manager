const Joi = require('joi');
const productModel = require('../models/productModel');
const NotFoundError = require('../errors/NotFoundError');
const { runSchema } = require('./validators');

const productService = {
  validateProductBody: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),
    
  async checkIfProductExists(productId) {
    const exists = await productModel.productExists(productId);
    if (!exists) throw new NotFoundError('Product not found');
    return true;
  },

  async getProductById(productId) {
    const product = await productModel.getProductById(productId);
    return product;
  },

  async listProducts() {
    const products = await productModel.listProducts();
    return products;
  },

  async addProduct(productName) {
    const productId = await productModel.addProduct(productName);
    return productId;
  },

  async updateProduct(productId, productName) {
    const affectedRows = await productModel.updateProduct(productId, productName);
    if (!affectedRows) return null;
    return { id: productId, name: productName };
  },

  async deleteProduct(productId) {
    const affectedRows = await productModel.deleteProduct(productId);
    if (!affectedRows) return false;
    return affectedRows;
  },
};

module.exports = productService;
