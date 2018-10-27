let express = require('express')
let app = express()
let predict = require('./clarifai')

app.use(express.static('./public'))
app.listen(3000)

console.log('Express app running on port 3000')
console.log(predict)

