const productService = require('../services/productService');

const NoContent = 204;
const Ok = 200;
const WellFormatted = 201;

const productController = {
  async listProducts(req, res) {
    const products = await productService.listProducts();
    return res.status(Ok).json(products);
  },

  async getProductById(req, res) {
    const productId = Number(req.params.id);
    await productService.checkIfProductExists(productId);
    const product = await productService.getProductById(productId);
    return res.status(Ok).json(product);
  },

  async addProduct(req, res) {
    const validatedProduct = productService.validateProductBody(req.body);
    const productId = await productService.addProduct(validatedProduct.name);
    await productService.checkIfProductExists(productId);
    const product = await productService.getProductById(productId);
    return res.status(WellFormatted).json(product);
  },

  async updateProduct(req, res) {
    const productId = Number(req.params.id);
    const validatedProduct = productService.validateProductBody(req.body);
    await productService.checkIfProductExists(productId);
    const updatedProduct = await productService.updateProduct(productId, validatedProduct.name);
    return res.status(Ok).json(updatedProduct);
  },

  async deleteProduct(req, res) {
    const productId = Number(req.params.id);
    await productService.checkIfProductExists(productId);
    await productService.deleteProduct(productId);
    return res.status(NoContent).json();
  },
};

module.exports = productController;
