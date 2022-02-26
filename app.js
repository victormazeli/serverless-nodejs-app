// 'use strict';

// const express = require('express')
// const sls = require('serverless-http')
// const app = express()
// const AWS = require('aws-sdk');
// const randomstring = require('randomstring')
// const upload = require('./utility/upload');


// // Set region
// let s3 = new AWS.S3({ 
//   accessKeyId: 'AKIAY35DEGOQ6ONQHAG6',
//   secretAccessKey: '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',
//   region: 'eu-central-1',
//  });

// var docClient = new AWS.DynamoDB.DocumentClient();

// var table = "LookUp";


// app.use(express.json())
// app.get('/', async (req, res, next) => {
//   res.status(200).send('Testing Function!')
// })

// app.post('/upload', upload.single('file'), async (req, res, next) => {
//   s3.getSignedUrl()

//   return res.status(200).json({msg:'file uploaded successfully', uploadLocation:req.file.location})
// });

// app.get('/get/file/:id', async (req, res, next) => {
//   const { id } = req.params
//   console.log(id)
//    var params = { Bucket: 'test-exam', Key: id };
//    let requestObject = s3.getObject(params);
//    requestObject.on('build', () => {
//      requestObject.httpRequest.headers['x-amz-server-side-encryption'] = 'AES256';
//    })
//    requestObject.on('success', (resp) => {
//     console.log(resp.request.httpRequest.headers)
//    })
//    requestObject.promise().then(response => {

//     res.status(200).json({file: response.Body.toString('utf-8')})
//    })
//    .catch(err =>  res.status(500).json({msg: err}))

  
// })
// module.exports.server = sls(app)

// // const ID = randomstring.generate({
// //   charset: 'numeric',
// //   length: 3
// // })
// // var params = {
// //   TableName:table,
// //   Item:{
// //       "id": ID,
// //       "name": req.file.key,
// //   }
// // };

// // docClient.put(params, function(err, data) {
// //   if (err) {
// //       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
// //   } else {
// //       console.log("Added item:", JSON.stringify(data, null, 2));
// //   }
// // });