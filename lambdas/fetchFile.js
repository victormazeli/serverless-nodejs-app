const Responses = require('../common/API_Responses');
const Dynamo = require("../common/Dynamo");
const S3 = require("../common/S3");

const tableName = process.env.tableName;

const bucket = process.env.bucketName;

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const filename = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!filename) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    const fileName = filename.Filename;

    const file = await S3.get(ID, bucket).catch(err => {
        console.log('error in S3 get', err);
        return null;
    });

    if (!file) {
        return Responses._400({ message: 'Failed to read data by filename' });
    }

    const fileurl = `https://${bucket}.s3-eu-central-1.amazonaws.com/${ID}`
    return Responses._200({ fileurl, originalName: fileName });


}