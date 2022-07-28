const saleService = require('../services/saleService');

const Ok = 200;
const WellFormatted = 201;

const saleController = {
  async addSale(req, res) {
    const salesList = req.body;
    await saleService.checkIfProductsExists(salesList);
    const saleId = await saleService.addSale();
    await saleService.addSaleProduct(saleId, salesList);
    return res.status(WellFormatted).json({ id: saleId, itemsSold: salesList });
  },

  async listSales(req, res) {
    const sales = await saleService.listSales();
    return res.status(Ok).json(sales);
  },

  async getSaleById(req, res) {
    const saleId = Number(req.params.id);
    await saleService.checkIfSaleExists(saleId);
    const sale = await saleService.getSaleById(saleId);
    return res.status(Ok).json(sale);
  },
};

module.exports = saleController;
