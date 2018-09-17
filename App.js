let MongoClient = require('mongodb').MongoClient
let express = require("express");
let app = express();
app.set('views engine', "ejs");
let async = require('async');

function getTable() {
    return new Promise(resolve =>{
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err
        let db = client.db('qaorganiser')
        db.collection('schedule').find().toArray(function (err, result) {
            if (err) throw err;
            let result2 = [];
            result.forEach(function (doc) {
                let doc1 = [];
                db.collection('skills').findOne({Sid: doc.Sid}, function (err, resultSkill) {
                    if (err) throw err;
                    let skillName = resultSkill.Skill
                    doc1.push(skillName)

                })
                db.collection('roomInfo').findOne({Rid: doc.Roomid}, function (err, resultRoom) {
                    if (err) throw err;
                    let RoomName = resultRoom.Title
                    doc1.push(RoomName)

                })
                db.collection('trainerInfo').findOne({Tid: doc.Trainerid}, function (err, resultTrainer) {
                    if (err) throw err;
                    let TrainerName = resultTrainer.Name
                    doc1.push("Trainerid", TrainerName)

                })
                db.collection('groupInfo').findOne({Gid: doc.Groupid}, function (err, resultGroup) {
                    if (err) throw err;
                    let GroupName = resultGroup.Name
                    doc1.push(GroupName)
                    result2.push(doc1);

                })

            })
            resolve(result2)


        })


    })
})
}

app.get('/', async function(req, res) {
    let result2 = await getTable();
    console.log(result2)
    res.render('Homepage', {result2});
})



app.listen(8000)