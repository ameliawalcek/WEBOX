const { client } = require('../../server')

const checkCreatorInCache = (req, res, next) => {
  const { id } = req.params;
  
  client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    if (data != null) {
      res.send(data);
    } else {
      next();
    }
  });
};

const checkPageInCache = (req, res, next) => {
  const { category, page, input } = req.query;
  if (category || input) {
    next()
  } else {
    client.get(page, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (data != null) {
        res.send(data);
      } else {
        next();
      }
    });
  }
};

module.exports = {
  checkCreatorInCache,
  checkPageInCache
}