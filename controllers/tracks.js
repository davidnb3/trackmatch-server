const Match = require("../models/trackmatch");

exports.getAllMatches = (req, res, next) => {
  Match.find()
    .then((matches) => {
      res.status(200).json(matches);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createMatch = (req, res, next) => {
  const match = req.body.match;
  const trackMatch = new Match({
    firstTitle: match.firstTitle,
    firstArtist: match.firstArtist,
    firstImg: "http://localhost:3001/images/logo.png",
    secondTitle: match.secondTitle,
    secondArtist: match.secondArtist,
    secondImg: "http://localhost:3001/images/logo.png",
  });
  trackMatch
    .save()
    .then(() => {
      res.status(201).json({ message: "Match created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.deleteMatch = (req, res, next) => {
  // query instead of params? don't know why
  console.log(req.query.id);
  Match.findOne({_id: req.query.id}).then((match) => {
    
  })
};
