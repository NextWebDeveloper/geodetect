const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const port = process.env.PORT || 1000;
import secret from "./auth/assets";

import myInterceptor from "./api/interceptors";
app.use(myInterceptor);

import connectionString from "./db/connectionString";

const mongoose = require('mongoose');
import User from "./db/schemas/userSchema";

async function createUser(email, password) {
	return new User({
		email: email,
		password: password
	}).save()
}

async function findUser(email) {
	return await User.findOne({
		email
	})
}

app.use(express.static(__dirname + '/dist'));

mongoose.connect(connectionString, {
	useNewUrlParser: true
}, function (err) {
	if (err) return console.log(err);
	app.listen(3030, function () {
		console.log("Сервер ожидает подключения...");
	});
});

app.get("/api/detect_ip", function (req, res) {
	const clientIp = requestIp.getClientIp(req);
	const geo = geoip.lookup(clientIp);
	res.send(geo);
});

app.post("/api/join", function (req, res) {
	const email = req.body.email;
	let password = req.body.password;

	User.findOne({
		email: email
	})
		.exec(function (err, user) {
			if (user) {
				return res.status(422).send({errors: ['An account with this email already exists']})
			} else {
				bcrypt.hash(password, 10, function (err, hash) {
					if (err) {
						return res.sendStatus(500)
					} else {
						password = hash
						createUser(email, password)
							.then(() => res.status(201).send('Your account was successfully registered'))
							.catch(err => res.status(500).send(err))
					}
				})
			}
		})
});

app.post('/api/signin', function (req, res) {
	var email = req.body.email
	var password = req.body.password
	User.findOne({
			email: email
		})
		// указываем явно, что нам нужно значение поля password 
		// (ибо его выборка отключена в модели)
		.select('password')
		.exec(function (err, user) {
			if (err) {
				return res.status(500).send({message: 'Sorry, try again later'})
			}
			if (!user) {
				return res.status(422).send({message: 'Sorry, your email or password is wrong'})
			}
			bcrypt.compare(password, user.password, function (err, valid) {
				if (err) {
					return res.status(500).send({message: 'Sorry, try again later'})
				}
				if (!valid) {
					return res.status(422).send({message: 'Sorry, your email or password is wrong'})
				}
				
				const token = jwt.encode({
					email: email
				}, secret)
				res.status(200).send({token: token, id: user._id})
			})
		})
})

app.post('/api/check', function (req, res) {
	return res.send('asdasd');
})