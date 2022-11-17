const mongoose = require("mongoose");

const StartupSchema = new mongoose.Schema(
  {
    eventId: String,
    startupId: String,
    startupName: String,
    inductId: String,
    showCase: String,
    group: String,
    curated: String,
    rank: { type: Number, default: 0 },
    fonte: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", StartupSchema);
