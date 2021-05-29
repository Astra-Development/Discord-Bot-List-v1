const mongoose = require("mongoose");

const botsSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  username: {
    type: String,
    required: true
  },
  botid: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: true,
    default: "https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg"
  },
  invite: {
    type: String
  },
  botLibrary: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  inRecomendationQueue: {
    type: Boolean,
    default: false
  },
  long: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    default: "unverified"
  },
  support: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  github: {
    type: String
  },
	donation: {
    type: String
  },
  webhook: {
    type: String
  },
  tags: {
    type: Array,
    required: false,
    default: []
  },
  owners: {
    primary: {
      type: String,
      required: true
    },
    additional: {
      type: Array,
      default: []
    }
  },
  auth: {
    type: String
  },
  servers: [
    {
      time: {
        type: Date,
        default: () => Date.now()
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  nsfw: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  ratelimit: {
    time: {
      type: Date,
      default: () => Date.now()
    }
  },
  note: {
    type: String,
    required: false
  },
  certify: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Bots", botsSchema);