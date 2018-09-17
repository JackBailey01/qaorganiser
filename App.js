let MongoClient = require('mongodb').MongoClient
let express = require("express");
let app = express();
app.set('views engine', "ejs");

MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
    if (err) throw err
    let db = client.db('qaorganiser')
    db.collection('groupInfo').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
    })

})
app.get('/', function(req, res) {
    res.render('Homepage',{message:""});
});
app.listen(8000)