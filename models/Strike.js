const dynamoose = require("dynamoose")

module.exports = dynamoose.model("FFF-Strikes", new dynamoose.Schema({
    strikeId: {
        hashKey: true,
        type: Number,
    },
    datetime: {
        //rangeKey: true,
        type: Number,
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
}, {
    throughput: "ON_DEMAND"
}))