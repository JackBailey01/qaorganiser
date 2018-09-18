let MongoClient = require('mongodb').MongoClient
let express = require("express");
let app = express();
app.set('views engine', "ejs");

function getTable() {
    return new Promise(resolve =>{
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err
        let db = client.db('qaorganiser')
        db.collection('schedule').find().toArray( function (err, result) {
            if (err) throw err;
            let result2 = [];
            let i = result.length;
            result.forEach(async function (doc) {
                let doc1 = [];
                let trainer = await getTrainer(doc);
                let skill = await getSkill(doc);
                let room = await getRoom(doc);
                let groupInfo = await getGroupInfo(doc);
                doc1.push(trainer);
                doc1.push(skill);
                doc1.push(room);
                doc1.push(groupInfo);
                doc1.push(doc.Date);
                result2.push(doc1);
                if (i == 1) {
                    resolve(result2)
                }
                else {
                    i--
                }

            })

        })

    })
})
}

function getTrainer(doc){
    return new Promise(resolve => {
        MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
            if (err) throw err
            let db = client.db('qaorganiser')
            db.collection('trainerInfo').findOne({Tid: doc.Trainerid}, function (err, resultTrainer) {
                if (err) throw err;
                resolve(resultTrainer.Name)
            })
        })
    })
}

function getSkill(doc){
    return new Promise(resolve => {

        MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
            if (err) throw err
            let db = client.db('qaorganiser')
            db.collection('skills').findOne({Sid: doc.Sid}, function (err, resultSkill) {
                if (err) throw err;
                resolve(resultSkill.Skill)
            })
        })
    })
}
function getRoom(doc){
    return new Promise(resolve => {

        MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
            if (err) throw err
            let db = client.db('qaorganiser')
            db.collection('roomInfo').findOne({Rid: doc.Roomid}, function (err, resultRoom) {
                if (err) throw err;
                resolve(resultRoom.Title)
            })
        })
    })
}
function getGroupInfo(doc){
    return new Promise(resolve =>{
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err
        let db = client.db('qaorganiser')
        db.collection('groupInfo').findOne({Gid: doc.Groupid}, function (err, resultGroup) {
            if (err) throw err;
            resolve(resultGroup.Name);

        })
    })
    })
}

app.get('/', async function(req, res) {
    let result2 = await getTable();
    res.render('Homepage', {result2});
})





app.listen(8000)