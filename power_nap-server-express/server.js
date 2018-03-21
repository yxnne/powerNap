const express = require('express');
const bodyParser = require('body-parser');



// consts
const SERVER_LISTEN_PORT = 9093;

// create app
const app = express();

const userRouter = require('./routers/user');

// middlewares
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(SERVER_LISTEN_PORT, function(){
	console.log('The Server for powerNap is started using in Express listened in port :' + SERVER_LISTEN_PORT);
});

// to test server is running and capable for api
app.get('/testserver', function(req, res ){
	res.json({code:0, msg:'server is running ok'});
});



