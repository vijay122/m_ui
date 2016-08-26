 
var SmsGateway = require('smsgateway');
 
var gateway = new SmsGateway('livelytrips@gmail.com','vijayarunvijay');

exports.SendMessage = function(msg) {
    console.log('sending messages: ');

var number=msg;
var message="Warm welcome from LivelyTrips. Your Auth Key is : "+msg;
var deviceId="21463";
var options={};

    gateway.send(number, message, deviceId, options).then(function(data){
    console.log('getDevices Success');
    console.log(data);
}).fail(function(message){
    console.log('failed',message);
});
   
};

