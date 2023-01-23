const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 4000

const exerciseRouter = require('./routes/exercise')
const recipeRouter = require('./routes/recipes')


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))



app.use(recipeRouter)

app.use(exerciseRouter)

app.use((req, res, next) => {
    res.status(404).send({message: "pageNotFound"});
});



app.listen(port)