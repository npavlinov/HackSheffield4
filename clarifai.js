const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '1444a17f32b94bd1ab48ac7ce5e65603'
   });

exports.predict = app.models.initModel({id: Clarifai.FOOD_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
        console.log(concepts)
      })

// module.exports(predict)