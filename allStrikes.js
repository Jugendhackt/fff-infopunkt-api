
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

module.exports.allStrikes = async event => {
    console.log("Querying strikes...")
    const [err, items] = await to(Strikes.scan().exec())
    console.log("Query successful.")
    if(err) {
        console.log("Error.")
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
    console.log("Success.")
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

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
