
const to = require('await-to-js').default

const dynamoose = require("dynamoose")

// set important aws credentials
dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_LOCATION,
})

// check if we are using self-hosted dynamodb instance
if(process.env.DB_LOCAL == "true") {
    console.log("Using local database with address \"" + process.env.DB_ADDRESS + "\"")
    dynamoose.local(process.env.DB_ADDRESS)
} else console.log("Using cloud database")


// import model; create if not existing
const Strikes = require("./models/Strike")

module.exports.getStrike = async event => {

    // check if any query string parameters are set
    if(event.queryStringParameters) {
        if(event.queryStringParameters["id"]) {

            // get object by id
            const [err, items] = await to(Strikes.get({
                strikeId: event.queryStringParameters["id"]
            }))
            
            // check if code threw an error
            if(err) {
                // return internal server error
                return {
                    statusCode: 500,
                    body: JSON.stringify(
                        {
                            code: "ERR_DATABASE",
                            message: "Database query failed."
                        }
                    )
                }
            }

            // return elements with success code (200)
            items.code = "SUCCESS"
            items.message = ""
            return {
                statusCode: 200,
                body: JSON.stringify(
                    items
                )
            }
        } else {

            // return 400 malformed requests
            return {
                statusCode: 400,
                body: JSON.stringify(
                    {
                        code: "ERR_NOQUERY",
                        message: "No query specified."
                    }
                )
            }
        }
    } else {

        // return 400 malformed requests
        return {
            statusCode: 400,
            body: JSON.stringify(
                {
                    code: "ERR_NOQUERY",
                    message: "No query specified."
                }
            )
        }
    }

};
