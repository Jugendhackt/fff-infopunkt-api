const dynamoose = require("dynamoose")

module.exports = dynamoose.model("FFF-Strikes", new dynamoose.Schema({
    strikeId: {
        hashKey: true,
        type: Number,
    },
    date: {
        //rangeKey: true,
        type: String,
    },
    title: {
        type: String,
    },
    startTime: {
        type: String,
    },
    organisation: {
        type: String,
    },
    searchTitle: {
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
    source: {
        type: String,
    },
    description: {
        type: String,
    },
    meetingPoint: {
        type: String,
    },
    endPoint: {
        type: String
    },
    routeLength: {
        type: String,
    },
    groupSource: {
        type: String,
    },
}, {
    // use on demand throughput to support huge data added in short intervals
    throughput: "ON_DEMAND"
}))