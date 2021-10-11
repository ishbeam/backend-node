import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import mongoStore from 'connect-mongo';

import dotenv from 'dotenv';

//import routes from './routes/routes';
import router from './routes';

import * as Triggers from './listeners/db-watcher';

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()
const store = mongoStore(session)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('origin')
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// app.use(cors({
// 	credentials: true,
// 	origin: (origin, callback) => {
// 		console.log('origin')
// 		// if(origin.includes('ordr-web.herokuapp.com')) {
// 		callback(null, true)
// 		// } else {
// 		// callback(new Error('nah'), false)
// 		// }
// 	}
// }))

// if(process.env.NODE_ENV == 'production') {
// 	app.use(function(req, res, next) {
// 		if((req.get('X-Forwarded-Proto') !== 'https')) {
// 			res.redirect('https://' + req.get('Host') + req.url);
// 		} else
// 			next();
// 	});
// }

// app.use((req, res, next) => {
// 	// res.header({ 'Access-Control-Allow-Origin': 'https://ordr-web.herokuapp.com' })
// 	res.header({'Access-Control-Allow-Credentials': true})
// 	next()
// })


let mongoUrl = 'mongodb+srv://wildDB:Ic9LSiNLfRmrH0lz@wilddbcluster.4epck.mongodb.net/ordr?retryWrites=true&w=majority';
console.log('mongoUrl');
mongoose.connect(mongoUrl,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true}).then((db) => {
	console.log('connected')
}).catch(e => console.log('couldnt connect', e))

const sessionStore = new store({
	mongooseConnection: mongoose.connection,
	collection: 'sessions'
})

const WEEK = 1000 * 60 * 60 * 24 * 7;
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'abc123',
	store: sessionStore,
	cookie: { httpOnly: false, maxAge: WEEK },
	name: 'ordr-dev' //cookie name
	// ephemeral: true deletes the cookie when the browser is closed
	// secure: true ensures cookies are only used over https (website must be https)

	// genid: (req) => {
	// 	console.log('Inside the session middleware')
	// 	console.log(req.sessionID)
	// 	return uuid() // use UUIDs for session IDs
	//   },
}));

app.use('/api', router);

// if(process.env.NODE_ENV === 'production') {
// 	console.log('in prod')
// 	// Serve any static files
// 	app.use(express.static(path.join(__dirname, '../../client/build')));
// 	// Handle React routing, return all requests to React app
// 	app.get('*', function(req, res) {
// 		console.log('smhhhh')
// 		res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
// 	});
// }




// Triggers.watchOrderCreate()
// Triggers.watchOrderUpdate()

app.listen(PORT, () => console.log('listening on ', PORT))


// COMBAK support threading
// const express = require('express');
// const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

// const isDev = process.env.NODE_ENV !== 'production';
// const PORT = process.env.PORT || 5000;

// // Multi-process to utilize all CPU cores.
// if (!isDev && cluster.isMaster) {
//   console.error(`Node cluster master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//   });

// } else {
//   const app = express();

//   // Priority serve any static files.
//   app.use(express.static(path.resolve(__dirname, '../client/build')));

//   // Answer API requests.
//   app.get('/api', function (req, res) {
//     res.set('Content-Type', 'application/json');
//     res.send('{"message":"Hello from the custom server!"}');
//   });

//   // All remaining requests return the React app, so it can handle routing.
//   app.get('*', function(request, response) {
//     response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });

//   app.listen(PORT, function () {
//     console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
//   });
// }
