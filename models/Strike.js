const dynamoose = require("dynamoose")

module.exports = dynamoose.model("FFF-Strikes", new dynamoose.Schema({
    strikeId: {
        type: Number,
    },
    date: {
        type: String,
    },
    title: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    url: {
        type: String,
    },
    start: {
        type: Number,
    },
    source: {
        type: String,
    }
}))