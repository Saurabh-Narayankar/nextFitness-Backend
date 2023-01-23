const express = require('express')
const { collection, getDocs } = require('firebase/firestore')

const router = express.Router()

const db = require('../db')

router.get('/exercise/:targetMuscle', async (req, res,) => {

    try {
        const targetMuscle = req.params.targetMuscle

        const colRef = collection( db, `exercises/${targetMuscle}/${targetMuscle}Exercises`)
        const snapshots = await getDocs(colRef)
        const currentExerciseData = snapshots.docs.map(doc => doc.data())
        res.status(200).send(currentExerciseData)

    } catch (error) {  
        res.send(error)
    }

})

module.exports = router