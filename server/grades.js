var Grades = require('./models/grades')

module.exports = function grades(req, res){
    id = req.params.id
    console.log(id)
    Grades.find({studentId:id}, (error, result)=>{
        if (error) console.log(error)
        res.send(result) 
    })

}