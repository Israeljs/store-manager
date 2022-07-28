const errors = {
  productIdBlanck: '"productId" is required',
  quantityBlanck: '"quantity" is required',
  quantityLength: '"quantity" must be greater than or equal to 1',
};

const blanck = (value) => (!value);
const isGreaterThan = (value, min) => (value <= min);

const validate = (productId, quantity) => {
  const BadRequest = 400;
  const unprocessableEntity = 422;

  switch (true) {
    case blanck(productId): return { code: BadRequest, message: errors.productIdBlanck };
    case isGreaterThan(quantity, 0): return {
      code: unprocessableEntity,
      message: errors.quantityLength,
    };
    case blanck(quantity): return { code: BadRequest, message: errors.quantityBlanck };
    default: return {};
  }
};

const addSaleValidate = (saleBody) => {
  const [errorMessage] = saleBody.map(({ productId, quantity }) => validate(productId, quantity));
  return errorMessage;
};

module.exports = {
  addSaleValidate,
};
