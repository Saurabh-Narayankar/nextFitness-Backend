const express = require('express')
const { collection, getDoc, setDoc, getDocs, doc, addDoc }  = require('firebase/firestore')

const router = express.Router()

const db = require('../db')


router.get('/recipes/singleRecipe/:cuisine/:course/:id', async (req, res,) => {

    try {
        const cuisine = req.params.cuisine
        const course = req.params.course
        const id = req.params.id

        let editedCuisine = cuisine.charAt(0).toLowerCase() + cuisine.slice(1)
        let editedCourse;

        if (course === 'Main Course') {
            editedCourse = course.split(' ')
            editedCourse[0] = editedCourse[0].toLowerCase()
            editedCourse = editedCourse.join('')

        }else if (course === 'mainCourse') {
            editedCourse = course

        }else if (course === 'Side Dish') {
            editedCourse = course.split(' ')
            editedCourse[0] = editedCourse[0].toLowerCase()
            editedCourse = editedCourse.join('')

        } else {
            editedCourse = course.charAt(0).toLowerCase() + course.slice(1)
        }

        const docRef = doc(db, `recipes/${editedCuisine}/${editedCuisine}Recipes/${editedCourse}/${editedCourse}s`, `${id}`)  
        const snapshot = await getDoc(docRef)
        const singleRecipe = snapshot.data()
        res.status(200).send(singleRecipe)

    } catch (error) {  
        res.send(error)
    }

})


router.post('/recipes/addRecipe', async (req, res,) => {

    try {

        const cuisineBody = req.body.cuisine
        const courseBody = req.body.course
        
        const newObj = {}
        newObj.recipeName = req.body.recipeName
        newObj.cuisine = req.body.cuisine
        newObj.course = req.body.course
        newObj.dietType = req.body.dietType
        newObj.prepTimeInMins = req.body.prepTimeInMins
        newObj.cookTimeInMins = req.body.cookTimeInMins
        newObj.totalTimeInMins = req.body.totalTimeInMins
        newObj.servings = req.body.servings
        newObj.ingredients = req.body.ingredients
        newObj.instructions = req.body.instructions

        const docRef = await addDoc(collection(db, `/recipes/${cuisineBody}/${cuisineBody}Recipes/${courseBody}/${courseBody}s`), newObj);
        const docRefId = docRef.id
        newObj.id = docRefId
        await setDoc(doc(db, `/recipes/${cuisineBody}/${cuisineBody}Recipes/${courseBody}/${courseBody}s`, `${docRefId}`), newObj);
        res.status(200).send({ response: 'added successfully' })

    } catch (error) {  
        res.send(error)
    }

})


router.get('/recipes/:cuisine/:course/:dietType', async (req, res,) => {

    try {
        const cuisine = req.params.cuisine
        const course = req.params.course
        const dietType = req.params.dietType

        if (dietType === 'none') {
            const colRef = collection( db, `recipes/${cuisine}/${cuisine}Recipes/${course}/${course}s`)
            const snapshots = await getDocs(colRef)
            const filteredRecipe = snapshots.docs.map(doc => doc.data())
            res.status(200).send(filteredRecipe)    
        } else {
            const colRef = collection(db, `recipes/${cuisine}/${cuisine}Recipes/${course}/${course}s`)
            const snapshots = await getDocs(colRef)
            const filteredRecipe = snapshots.docs.map(doc => doc.data())
            const filteredRecipeUsingDiet = filteredRecipe.filter((recipe) => recipe.dietType === dietType)
            res.status(200).send(filteredRecipeUsingDiet)
        }

    } catch (error) {  
        res.send(error)
    }

})

module.exports = router