"use strict";

const Responses = require("../common/API_Responses");
const multipart = require("parse-multipart-data");
const Busboy = require("busboy");
const S3 = require("../common/S3");
const { uuid } = require("uuidv4");
const Dynamo = require("../common/Dynamo");

const bucket = process.env.bucketName;

const tableName = process.env.tableName;

exports.handler = async(event) => {
const processUpload = new Promise((resolve, reject) => {
  let contentType = event.headers["Content-Type"];
  let bb = Busboy({ headers: { "content-type": contentType } });
  let result = {};

  bb.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    result.fname = filename,
    result.ftype = mimetype,
    result.encoding = encoding
    file.on("data", function (data) {
      let convertData = [];
      convertData.push(data);
      result.file = Buffer.concat(convertData);
    });
    file.on("end", function () {
      result.filename = filename;
      result.contentType = mimetype;
    });
  });
  bb.on("field", function (fieldname, val) {
    result[fieldname] = value;
  });
  bb.on("finish", function () {
    console.log("Done parsing form!");

    resolve(result);
  });
  console.log("event.isBase64Encoded");
  console.log(event.isBase64Encoded);
  bb.write(event.body, event.isBase64Encoded ? "base64" : "binary");
  bb.end();
});

let upload = await processUpload;
const ID = uuid()
const newData = await S3.write(upload.file, ID, bucket).catch(err => {
  console.log('error in S3 write', err);
  return null;
});

if (!newData) {
  return Responses._400({ message: 'Failed to write data by filename' });
}
const fileurl = `https://${bucket}.s3-eu-central-1.amazonaws.com/${ID}`

const item = {
  ID,
  Filename: upload.filename.filename

}

const newInput = await Dynamo.write(item, tableName).catch(err => {
  console.log('error in dynamo write', err);
  return null;
});

if (!newInput) {
  return Responses._400({ message: 'Failed to write user by ID' });
}

return Responses._200({ message:'upload successful', url: fileurl});

}

  
