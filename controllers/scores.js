var Score = require("../models/score");

module.exports = {
  create,
  highScores,
  update,
};

async function create(req, res) {
  const emails = req.body.guest.split(",");
  req.body.guest = emails.map((i) => {
    return { email: i.trim(), status: "" };
  });
  try {
    await Score.create(req.body);
    // Use the highScores action to return the list
  } catch (err) {
    res.json({ err });
  }
}

async function highScores(req, res) {
  const scores = await Score.find({ "guest.email": req.user.email })

    .sort({ numGuesses: 1, seconds: 1 })
    // Default to a limit of 20 high scores
    // if not specified in a query string
    .limit(req.query.limit || 20);

  res.json(scores);
}

async function update(req, res) {
  try {
    await (Score.findById(req.body.eventId,  async (err, evtFound) => {
      evtFound.guest.forEach((i) => {
        if (i.email == req.user.email) {
          i.status = req.body.status;
        }
      });
      
      await evtFound.save()
      
       highScores(req, res)
    }))
    
    // Use the highScores action to return the list
  } catch (err) {
    res.json({ err });
  }
}
