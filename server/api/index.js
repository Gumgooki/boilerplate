const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/
router.use('/login', require('./login'))
router.use('/signup', require('./signup'))
router.use('/logout', require('./logout'))

module.exports = router;

//for routes that don't exist
router.use(function(req, res, next){
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})
