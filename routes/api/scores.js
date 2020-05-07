const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');


/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.get('/', checkAuth, scoresCtrl.highScores);
router.post('/', checkAuth, scoresCtrl.create);
router.put('/', checkAuth, scoresCtrl.update);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
