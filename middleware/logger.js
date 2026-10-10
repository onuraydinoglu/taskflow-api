const logger = (req, res, next) => {
  const time = new Date().toLocaleString("tr-TR");

  console.log(`${req.method} ${req.originalUrl} - ${time}`);

  next();
};

module.exports = logger;
