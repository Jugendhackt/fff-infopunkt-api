
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

module.exports.searchByTitle = async event => {

    // check if any query string parameters are set
    if(event.queryStringParameters) {
        if(event.queryStringParameters["q"]) {

            // search for any objects that contain query in title
            const [err, items] = await to(Strikes.scan("searchTitle").contains(event.queryStringParameters["q"].toLowerCase()).exec())
            
            // check if code threw an error
            if(err) {
                // return internal server error
                return {
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(
                        {
                            code: "ERR_DATABASE",
                            message: "Database query failed."
                        }
                    )
                }
            }

            // return elements with success code (200)
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(
                    {
                        code: "SUCCESS",
                        message: "",
                        items,
                    }
                )
            }
        } else {

            // return 400 malformed requests
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
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
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(
                {
                    code: "ERR_NOQUERY",
                    message: "No query specified."
                }
            )
        }
    }

};
