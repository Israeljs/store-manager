const { addSaleValidate } = require('../schemas/saleSchema');

const validateSale = (req, res, next) => {
  const saleBody = req.body;

  const { code, message } = addSaleValidate(saleBody);

  if (message) return res.status(code).send({ message });

  next();
};

module.exports = {
  validateSale,
};
