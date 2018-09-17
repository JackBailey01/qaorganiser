let express = require('express');
let MongoClient = require('mongodb').MongoClient
let router = express.Router();
let bodyParser = require('body-parser');

router.get('/', function(req, res) {
    MongoClient.connect('mongodb://matt:password1@ds159812.mlab.com:59812/qaorganiser', function (err, client) {
        if (err) throw err
        let db = client.db('qaorganiser')
        db.collection('trainerInfo').find().toArray(function (err, result) {
            if (err) throw err
            res.render('TrainerInfo',{result});
        })
    });
})

router.use(bodyParser.urlencoded({extend: true}))

/*router.post('trainerInfo',(req,res) => {
    var Trainer = {
        Tid: req.params.Tid,
        Name: req.params.Name
    };
    db.collection('trainerInfo').save(Trainer, (err,result) =>{
        if(err) throw err
    })
    res.send('Trainer Added')
})*/

router.post('/TrainerInfo', (req,res) => {
    console.log('When I were a lad')
    console.log(req.body)
    console.log()
})

module.exports = router;