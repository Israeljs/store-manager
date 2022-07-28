const db = require('./db');

const saleModel = {
  async addSale() {
    const sql = `
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `;
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },

  async addSaleProduct(salesId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity)
      VALUES( ? , ? , ? )
      `;
    const [{ insertId }] = await db.query(sql, [salesId, productId, quantity]);
    return insertId;
  },

  async listSales() {
    const sql = `
      SELECT sale_id AS saleId, s.date,
        sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
    `;
    const [sales] = await db.query(sql);
    return sales;
  },

   async getSaleById(salesId) {
     const sql = `
       SELECT s.date, sp.product_id AS productId, sp.quantity
       FROM StoreManager.sales AS s
       INNER JOIN StoreManager.sales_products AS sp
       ON s.id = sp.sale_id
       WHERE sp.sale_id = ?
       ORDER BY sp.product_id
    `;
    const [sale] = await db.query(sql, [salesId]);
    return sale;
  },
};

module.exports = saleModel;
