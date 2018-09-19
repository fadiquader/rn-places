const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const gsc = require("@google-cloud/storage")({
//   projectId: 'unwomen-6da62',
//   keyFilename: 'unwomen.json',
// });
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'unwomen-6da62',
  keyFilename: 'unwomen.json',
});

admin.initializeApp({
  credential: admin.credential.cert(require('./unwomen.json'))
});
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if(!request.headers.authorization) {
      console.log('unauthorized')
      return response.status(403).json({ error: 'unauthorized' })
    }
    let idToken = request.headers.authorization.split('Bearer ')[1]
    admin.auth()
      .verifyIdToken(idToken)
      .then(decoded => {
        const body = request.body;
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
          response.status(500).json({ error: err })
        });
        const bucket = storage.bucket('unwomen-6da62.appspot.com');
        const uuid = UUID();
        bucket.upload('/tmp/uploaded-image.jpg', {
          uploadType: 'media',
          destination: '/places/'+uuid+'.jpg',
          metadata: {
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: uuid
            }
          }
        }, (err, file) => {
          console.log('file ', file)
          console.log('err ', err)
          if(!err) {
            response.status(201).json({
              imageURL: 'https://firebasestorage.googleapis.com/v0/b/'+
              bucket.name+'/o/'+encodeURIComponent(file.name)+'?alt=media&token='+uuid
            })
          } else {
            console.log(err);
            response.status(500).json({ error: err });
          }
        })
      })
      .catch(err => {
        console.log('Invalid Token')
        return response.status(403).json({ error: 'unauthorized' })
      })
  });
});

