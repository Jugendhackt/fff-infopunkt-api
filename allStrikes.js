
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

module.exports.allStrikes = async event => {
    console.log("Querying strikes...")
    // query ALL elements in dynamodb
    const [err, items] = await to(Strikes.scan().exec())
    console.log("Query successful.")
    if(err) {
        console.log("Error.")

        // return 500 if database query failed
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
    console.log("Success.")

    // return all elements with success code (200)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(
            {
                code: "SUCCESS",
                message: "",
                items: items.sort(),
            }
        )
    }

};
