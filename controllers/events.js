var Event = require("../models/event");

module.exports = {
  create,
  allEvents,
  update,
};

async function create(req, res) {
  const emails = req.body.guest.split(",");
  req.body.guest = emails.map((i) => {
    return { email: i.trim(), status: "" };
  });
  try {
    await Event.create(req.body);
    // Use the allEvents action to return the list
    allEvents(req, res);
  } catch (err) {
    res.json({ err });
  }
}

async function allEvents(req, res) {
  const events = await Event.find({ "guest.email": req.user.email })

    .sort({ dates: 1 })
    // Default to a limit of 20 events
    // if not specified in a query string
    .limit(req.query.limit || 20);

    

  res.json(events);
}

async function update(req, res) {
  try {
    await Event.findById(req.body.eventId, async (err, evtFound) => {
      evtFound.guest.forEach((i) => {
        if (i.email == req.user.email) {
          i.status = req.body.status;
        }
      });

      await evtFound.save();

      allEvents(req, res);
    });

    // Use the allEvents action to return the list
  } catch (err) {
    res.json({ err });
  }
}
