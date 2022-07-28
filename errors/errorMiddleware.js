module.exports = (err, _req, res, _next) => {
const { name, message } = err;
  const messageError = '"name" length must be at least 5 characters long';
  let status = 400;
  switch (name) {
    case 'ValidationError':
      if (message === messageError) status = 422;
      res.status(status).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
};
