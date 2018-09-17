let MongoClient = require('mongodb').MongoClient
let express = require("express");
let app = express();
let T = require("./TrainerInfo.js")
app.set('view engine', "ejs");
app.use("/",T);
/*MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
    if (err) throw err
    let db = client.db('qaorganiser')
    db.collection('groupInfo').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
    })

})*/

app.listen(8000)