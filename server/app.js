const express = require('express');
const cors = require('cors');
const expressip = require('express-ip');

const app = express();

app.use(cors());
app.use(expressip().getIpInfoMiddleware);

const port = process.env.PORT || 1000

// app.get('/', function (req, res) {
// 	var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
// 	req.connection.remoteAddress || 
// 	req.socket.remoteAddress || 
// 	req.connection.socket.remoteAddress
//   return res.send(ip + '___' + req.connection.remoteAddress);
// });

const connectionString = 'mongodb+srv://geoDBUser:asHnvsz64Vmq9uXH@cluster0-esnud.gcp.mongodb.net/test2?retryWrites=true&w=majority'

const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')
const User = mongoose.model('user', userSchema, 'userss')

async function createUser(username) {
	return new User({
		username,
		created: Date.now()
	}).save()
}

async function findUser(username) {
	return await User.findOne({
		username
	})
}

// ;(async () => {
//   const connector = mongoose.connect(connectionString)
//   const username = process.argv[2].split('=')[1]

//   let user = await connector.then(async () => {
//     return findUser(username)
//   })

//   if (!user) {
//     user = await createUser(username)
//   }

//   console.log(user)
//   process.exit(0)
// })()



app.use(express.static(__dirname + '/dist'));


mongoose.connect(connectionString, {
	useNewUrlParser: true
}, function (err) {
	if (err) return console.log(err);
	app.listen(port, function () {
		console.log("Сервер ожидает подключения...");
	});
});

app.get("/api/detect_ip", function (req, res) {
	const ipInfo = req.ipInfo;
	const message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
	res.send(message);
});

app.get("/api/detect_ipp", function (req, res) {
	res.send(req.ipInfo);
});

app.get("/api/detect_ippp", function (req, res) {
	var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
		 req.connection.socket.remoteAddress
		
	var geo = geoip.lookup(ip);

	res.send(geo);
});