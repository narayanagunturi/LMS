const IncomingForm = require('formidable').IncomingForm;
const csv = require('fast-csv')
const fs = require('fs')

const Grades = require('./models/grades')

module.exports = function upload(req, res) {
    var form = new IncomingForm();/* we take input form data*/
    form.parse(req, function(err, fields, files) {
        /* we paarse the corrsponding form fields and uploaded file data here*/
        if (err) next(err);
        results = []
        /* here we read the file*/
        var stream = fs.createReadStream(files["file"].path);
 
var csvStream = csv()
    .on("data", function(data){
        Grades.findOne({courseId:fields["courseId"],studentId:data[0]}, (err, result)=>{
            if (err) console.log(err)
            if(result){
                /* we can update mentor also here*/
                result.grade = data[2]
                result.startDate = Date.parse(fields["startDate"])
                result.save((error, results)=>{
                    if(error) console.log(error)
                    else console.log(results)

                })
            }else{
                /* if new form comes or if data doesn't exist all fields are updated here*/
                grade = new Grades({courseId:fields["courseId"],studentId:data[0],mentor:data[1], grade:data[2],startDate:Date.parse(fields["startDate"])})
                grade.save((e, result)=>{
                if(e) console.log(e)
                console.log(result)
         })
            }
        })
         
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);
    // [
    //   { NAME: 'Daffy Duck', AGE: 24 },
    //   { NAME: 'Bugs Bunny', AGE: 22 }
    // ]
  });
        res.end();
    
}