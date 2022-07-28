const express = require('express');
const saleController = require('../controllers/saleController');
const { validateSale } = require('../middlewares/saleMiddlewares'); 

const router = express.Router();

router.get('/', saleController.listSales);
router.get('/:id', saleController.getSaleById);
router.post('/', validateSale, saleController.addSale);

module.exports = router;
