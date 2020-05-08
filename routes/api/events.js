const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/events');


/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.get('/', checkAuth, eventsCtrl.allEvents);
router.post('/', checkAuth, eventsCtrl.create);
router.put('/', checkAuth, eventsCtrl.update);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
