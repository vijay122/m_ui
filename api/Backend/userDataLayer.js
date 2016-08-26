var mongo = require('mongodb');
var util = require('util');
var fs = require('fs');
var http = require('http');
var rand = require("random-key");
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var Sms = require('utils/utils');
var server = new Server('localhost', 27017, {auto_reconnect: true});


var db = new Db('usersDB', server, {safe: true});

db.open(function (err, db) {
    if (!err) {
        console.log("'usersDB' opened for connection with Livelytrips");
        db.collection('places', {safe: true}, function (err, collection) {
            if (err) {
                console.log("The 'places' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});



exports.addUser = function (name) {
    var user = name;
	var firsttimekey = rand.generate(7);
	user.passwd = firsttimekey;
    console.log('Adding place: ' + JSON.stringify(user));

    db.createUser(
   {
     user: "appAdmin",
     pwd: "password",
     roles:
       [
         { role: "readWrite", db: "config" },
         "clusterAdmin"
       ]
   }
);

/*
        db.collection('users', function (err, collection) {
            collection.insert(user, {safe: true}, function (err, result) {
                if (err) 
                {
                    res.send({'error': 'An error has occurred'});
                } else 
                {

                	Sms.SendMessage(firsttimekey);
                    console.log('Success: ' + JSON.stringify(result[0]));
                    
                }
            });
        });
        */
}
exports.loadUserInfo = function (name,password) {
    var user = name;
    var firsttimekey = rand.generate(7);
    user.passwd = firsttimekey;
    console.log('Adding place: ' + JSON.stringify(user));

   var userdetails =db.getUser(name);
console.log(userdetails);
/*
        db.collection('users', function (err, collection) {
            collection.insert(user, {safe: true}, function (err, result) {
                if (err) 
                {
                    res.send({'error': 'An error has occurred'});
                } else 
                {

                    Sms.SendMessage(firsttimekey);
                    console.log('Success: ' + JSON.stringify(result[0]));
                    
                }
            });
        });
        */
}
exports.updatePlace = function (req, res) {
    var id = req.params.id;
    var place = req.body;
    delete place._id;
    console.log('Updating place: ' + id);
    console.log(JSON.stringify(place));
    db.collection('places', function (err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, place, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating place: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(place);
            }
        });
    });
}

exports.deletePlace = function (req, res) {
    var id = req.params.id;
    console.log('Deleting place: ' + id);
    db.collection('places', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

//ToDo
