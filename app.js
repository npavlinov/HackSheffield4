let ingrArray = ['chicken', 'onion', 'salmon', 'apple', 'carrot', 'cabbage', 'potato', 'tomatoes', 'pork', 'salmon', 'tuna', 'peach', 'flour',
  'iceberg', 'beef', 'sugar', 'salt', 'egg', 'lettuce', 'butter', 'lemon', 'lime', 'garlic', 'clam', 'wine', 'oil', 'rice', 'cucumber', 'blueberry', 'strawberry', 'bacon', 'cream',
  'banana', 'cinnamon', 'cheese', 'bread', 'bun', 'parmesan', 'mushroom', 'pretzel', 'chili', 'basil', 'sausage', 'salami', 'mozzarella', 'ham', 'melon', 'ice', 'honey']

let express = require('express')
let cors = require('cors')
const Clarifai = require('clarifai')
let unirest = require('unirest');
let fs = require('fs')
let path = require('path')

const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('default-application_5bd56fede4b02e44153fc8ce', '97ec5774-aa3d-42ea-9a5e-618a63282937');
const capp = new Clarifai.App({
    apiKey: '1444a17f32b94bd1ab48ac7ce5e65603'
});

let recipesJson = []

let app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./public'))
app.get('/recipes', (req,res,next) => {
    res.json(recipesJson)
})
app.post('/recipes', (req,res) => {
    link = req.body.linkText
    capp.models.initModel({id: Clarifai.FOOD_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    .then(generalModel => {
        return generalModel.predict(link)
    })
    .then(response => {
        let concepts = response['outputs'][0]['data']['concepts']    
        let stringIngredients = str(concepts, ingrArray)
        unirest.get(stringIngredients)
        .header("X-Mashape-Key", "lbMuvYL57ymshDSnmUI4ERRipN9jp1o1aG7jsn4Z4vI5Jwv09D")
        .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
        .end(function (result) {
            let recipes = result.body
            recipesJson.push(recipes)
            res.json(recipes)
        })     
    })
})
app.listen(3000)

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; 
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

str = (A, B) => {
    let count = Object.keys(A).length
    for(let i = 0; i < count; i++) {
        if(A[i].value >= 0.7) {
            A.push(A[i].name)
        }
    }
    let C = intersect(A,B)
    let final = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" 
    for(let i = 0; i < C.length; i++) {
        final += C[i] + '%2C'
    }
    final = final.slice(0,final.length-3)
    return final + '&number=5&ranking=1'
}