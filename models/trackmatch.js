const mongoose = require("mongoose");

const trackmatchSchema = mongoose.Schema({
  firstTitle: { type: String, required: true },
  firstArtist: { type: String, required: true },
  firstCoverImg: { type: String, required: true },
  secondTitle: { type: String, required: true },
  secondArtist: { type: String, required: true },
  secondCoverImg: { type: String, required: true },
});

module.exports = mongoose.model("Trackmatch", trackmatchSchema);
