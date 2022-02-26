// const multer  = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
// const { fromString } = require('uuidv4')
// const { sendToQueue } = require('./producer')

// let s3 = new aws.S3({ 
//     accessKeyId: 'AKIAY35DEGOQ6ONQHAG6',
//     secretAccessKey: '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',
//     region: 'eu-central-1',
//    }) 

// module.exports = multer({
//     storage: multerS3({
//      s3: s3,
//      bucket: 'test-exam',
//      serverSideEncryption: 'AES256',
//      metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//      },
//      key: function (req, file, cb) {
//       cb(null, fromString(file.originalname))
//      },
//     })
//    })


//  const multer = require('multer');
// const path  = require('path');

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './upload');
//      },
//     filename: function (req, file, cb) {
//         cb(null , file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//     }
// });


// var upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 5000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) { 
//            // upload only png and jpg format
//            return cb(new Error('invalid image format, must be png or jpg'));
//          }
//        cb(undefined, true)
//     } 

// });


// module.exports = {
//     upload
// }