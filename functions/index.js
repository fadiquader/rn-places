const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/image.jpg', body.image, 'base64', (err) => {
      response.status(500).json({ error: err })
    })
  })
 response.send("Hello from Firebase!");
});

