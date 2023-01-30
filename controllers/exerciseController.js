const db = require('../db')
const { collection, getDocs } = require('firebase/firestore')

exports.getFilteredExercises = async (req, res,) => {

    try {
        const targetMuscle = req.params.targetMuscle

        const colRef = collection(db, `exercises/${targetMuscle}/${targetMuscle}Exercises`)
        const snapshots = await getDocs(colRef)
        const currentExerciseData = snapshots.docs.map(doc => doc.data())
        res.status(200).send(currentExerciseData)

    } catch (error) {  
        res.send(error)
    }

}