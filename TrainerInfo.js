let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extend: true}));

router.get('/', function(req, res) {
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err;
        let db = client.db('qaorganiser');
        db.collection('trainerInfo').find().toArray(function (err, result) {
            if (err) throw err;
            res.render('trainerInfo',{result});
        })
    });
})

router.post('/TrainerInfo',(req,res) => {
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err;
        var Trainer = {Tid: req.body.TrainerID, Name: req.body.TrainerName};
        console.log(Trainer);
        let db = client.db('qaorganiser');
        db.collection('trainerInfo').save(Trainer, (err,result) =>{
            if(err) throw err
            res.send('Trainer Added')
        });

    })
})

router.post('/editTrainerInfo', (req,res) => {
    var item = {
        Name: req.body.TrainerName,
        Tid: req.body.TrainerID
    };
        var Tid = req.body.TrainerID;

    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err;
        console.log(item)
        let db = client.db('qaorganiser');
            db.collection('trainerInfo').updateOne({Tid : Tid}, {$set: {"Name" : req.body.TrainerName}}, function(err,result) {
                if(err) throw err
                console.log('Update Complete')
            })
        })
});

router.get('/deleteTrainer/:A', (req,res) => {
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
      if(err) throw err;
      var Tid = req.params.A;
      let db = client.db('qaorganiser');
      db.collection('trainerInfo').deleteOne({Tid : Tid}, function (err, result) {
          console.log("Item Deleted")
      })
    })
})



module.exports = router;