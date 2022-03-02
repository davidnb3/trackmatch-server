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
  const match = req.body.trackMatch;
  const trackMatch = new Match({
    firstTitle: match.firstSelectedTrack.title,
    firstArtist: match.firstSelectedTrack.artist,
    firstCoverImg: match.firstSelectedTrack.albumUrl,
    secondTitle: match.secondSelectedTrack.title,
    secondArtist: match.secondSelectedTrack.artist,
    secondCoverImg: match.secondSelectedTrack.albumUrl,
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
  const matchId = req.query.id;
  Match.deleteOne({ _id: matchId })
    .then(() => {
      res.status(200).json({ message: "Deleted." });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
