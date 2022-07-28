const db = require('./db');

const productModel = {
  async listProducts() {
    const sql = `
      SELECT *
      FROM StoreManager.products
    `;
    const [products] = await db.query(sql);
    return products;
  },

  async productExists(productId) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id = ?
    `;
    const [[exists]] = await db.query(sql, [productId]);
    return !!exists;
  },
  
  async getProductById(productId) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id = ?
    `;
    const [[product]] = await db.query(sql, [productId]);
    return product;
  },

  async addProduct(productName) {
    const sql = `
      INSERT
      INTO StoreManager.products (name)
      VALUES (?)
    `;
    const [{ insertId }] = await db.query(sql, [productName]);
    return insertId;
  },

  async updateProduct(productId, productName) {
    const sql = `
      UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?
      `;
    const [{ affectedRows }] = await db.query(sql, [productName, productId]);
    return affectedRows;
  },

  async deleteProduct(productId) {
    const sql = `
      DELETE FROM StoreManager.products
      WHERE id = ?
    `;
    const [{ affectedRows }] = await db.query(sql, [productId]);
    return affectedRows;
  },

};

module.exports = productModel;
