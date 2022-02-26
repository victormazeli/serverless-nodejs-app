const AWS = require('aws-sdk');
const s3Client = new AWS.S3();

const S3 = {
    async write(data, fileName, bucket) {
        const params = {
            Bucket: bucket,
            Body: data,
            Key: fileName,
        };
        const newData = await s3Client.putObject(params).promise();
        if (!newData) {
            throw Error('there was an error writing the file');
        }
        return newData;
    },
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };
        let data = await s3Client.getObject(params).promise();
        if (!data) {
            throw Error(`Failed to get file ${fileName}, from ${bucket}`);
        }
        if (fileName.slice(fileName.length - 4, fileName.length) == 'json') {
            data = data.Body.toString();
        }
        return data;
    },
    async getSignedUrl(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };
        let data = s3Client.getSignedUrl('putObject',params)
        console.log(data)
        if (!data) {
            throw Error(`Failed to get file ${fileName}, from ${bucket}`);
        }

        return data;
    }
};
module.exports = S3;