
const to = require('await-to-js').default

const dynamoose = require("dynamoose")
dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_LOCATION,
})
if(process.env.DB_LOCAL == "true") {
    console.log("Using local database with address \"" + process.env.DB_ADDRESS + "\"")
    dynamoose.local(process.env.DB_ADDRESS)
} else console.log("Using cloud database")

const Strikes = require("./models/Strike")

module.exports.searchByTitle = async event => {

    if(event.queryStringParameters) {
        if(event.queryStringParameters["q"]) {
            const [err, items] = await to(Strikes.scan("searchTitle").contains(event.queryStringParameters["q"].toLowerCase()).exec())
            if(err) {
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
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        code: "SUCCESS",
                        message: "",
                        items,
                    }
                )
            }
        } else {
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
