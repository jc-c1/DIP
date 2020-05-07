var Score = require('../models/score');

module.exports = {
  create,
  highScores, 
  update
};

async function create(req, res) {
  console.log('user: ', req.user)
  console.log(req.body)
  const emails = req.body.guest.split(',')
  req.body.guest = emails.map(
    (i)=>{
      return(
      { 'email' : i.trim(), 
        'status' : ""})
    }
    )
  try {
    await Score.create(req.body);
    // Use the highScores action to return the list
  
  } catch (err) {
    res.json({err});
  }
}

async function highScores(req, res) {
  console.log(req.user)
  const scores = await Score.find({'guest.email':req.user.email})
  
    .sort({numGuesses: 1, seconds: 1})
    // Default to a limit of 20 high scores
    // if not specified in a query string
    .limit(req.query.limit || 20);
    console.log(scores)
  res.json(scores);
}



async function update(req, res) {
  console.log('user: ', req.user)

  try {
    await Score.findById(req.body.eventId, 
      (err, evtFound) => {evtFound.guest.forEach((i)=>{if (i.email = req.user.email){i.status = req.body.status}})})

    // Use the highScores action to return the list
    highScores(req, res);
  } catch (err) {
    res.json({err});
  }
}

