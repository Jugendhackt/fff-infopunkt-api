const dynamoose = require("dynamoose")
dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
})
if(process.env.DB_LOCAL) {
    dynamoose.local(process.env.DB_ADDRESS)
}

const Strikes = require("./models/Strike")

module.exports.allStrikes = async event => {
    const [err, items] = await to(Schools.scan().exec())
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

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
