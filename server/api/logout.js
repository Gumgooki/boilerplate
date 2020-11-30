const router = require('express').Router();

router.delete('/', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

module.exports = router;
