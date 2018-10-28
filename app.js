let express = require('express')
let cors = require('cors')
const Clarifai = require('clarifai')

const capp = new Clarifai.App({
    apiKey: '1444a17f32b94bd1ab48ac7ce5e65603'
});
let app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./public'))
let promiseLink = new Promise(function(resolve, reject) {
    app.post('/recipes', (req, res) => {
        resolve(req.body.linkText)
})})
promiseLink.then(function(value) {
    capp.models.initModel({id: Clarifai.FOOD_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict(value)
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
        console.log(concepts)
      })
})

app.listen(3000)

