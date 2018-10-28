let ingrArray = [chicken, onion, salmon, apple, carrot, cabbage, potato, tomatoes, pork, salmon, tuna, peach, flour,
  iceberg, beef, sugar, salt, egg, lettuce, butter, lemon, lime, garlic, clam, wine, oil, rice, cucumber, blueberry, strawberry, bacon, cream,
  banana, cinnamon, cheese, bread, bun, parmesan, mushroom, pretzel, chili, basil, sausage, salami, mozzarella, ham, melon, ice, honey,]

let express = require('express')
let cors = require('cors')
const Clarifai = require('clarifai')
/*let unirest = require('unirest');

const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('default-application_5bd4d1ece4b09efa5fbcc3cc', '2e7169c5-3a68-4f28-9082-55a6ff85e92e');

 unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ranking=1")
.header("X-Mashape-Key", "aicwhDrF1qmsh3SagJT9KtXrOeqop1mxstbjsnRhwbe8G5yL6h")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
   console.log( result.body);
}); */



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

