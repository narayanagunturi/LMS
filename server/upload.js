const IncomingForm = require('formidable').IncomingForm;
const csv = require('fast-csv')
const fs = require('fs')

const Grades = require('./models/grades')
module.exports = function upload(req, res) {
    var form = new IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(files["file"].path)
        if (err) next(err);
        results = []
        var stream = fs.createReadStream(files["file"].path);
 
var csvStream = csv()
    .on("data", function(data){
        console.log(fields["startDate"])
        Grades.findOne({courseId:fields["courseId"],studentId:data[0]}, (err, result)=>{
            if (err) console.log(err)
            if(result){
                result.grade = data[2]
                result.startDate = Date.parse(fields["startDate"])
                result.save((error, results)=>{
                    if(error) console.log(error)
                    else console.log(results)

                })
            }else{
                grade = new Grades({courseId:fields["courseId"],studentId:data[0],mentor:data[1], grade:data[2], startDate:Date.parse(fields["startDate"])})
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