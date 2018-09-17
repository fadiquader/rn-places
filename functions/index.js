const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid/v4');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const gcConfig = {
  projectId: 'unwomen-6da62',
  keyFilename: 'unwomen.json',
};
const gsc = require('@google-cloud/storage')(gcConfig);

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
      response.status(500).json({ error: err })
    });
    const bucket = gsc.bucket('smart-hands-1214f.appspot.com');
    const uuid = UUID();
    bucket.upload('/tmp/uploaded-image.jpg', {
      uploadType: 'media',
      destination: '/places/'+uuid+'.jpg',
      metadata: {
        contentType: 'image/jpeg',
        firebaseStorageDownloadTokens: uuid
      }
    }, (err, file) => {
      if(!err) {
        response.status(201).json({
          imageURL: 'https://firebasestorage.googleapis.com/v0/b/'+
          bucket.name+'/o/'+encodeURIComponent(file.name)+'?alt=media&token='+uuid
        })
      }
    })
  });
 response.send("Hello from Firebase!");
});

