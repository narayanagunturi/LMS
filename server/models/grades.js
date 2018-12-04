var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/lms-project')
var Schema = mongoose.Schema
var gradesSchema = new Schema({
    courseId:{type:String, required:true},
    studentId:{type:String, required:true},
    mentor:{type:String, required:true},
    grade:{type:String, required:true},
    startDate:{type:Date, required:true}
})

var Grades = mongoose.model('Grades', gradesSchema)
module.exports = Grades