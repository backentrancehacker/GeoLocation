// General modules
const util = require('./modules/util.js'),
	path = require('path'),
	
	// Express
	express = require("express"),
	app = express(),
	
	// IP
	fetch = require('node-fetch');

// Engine
app
.set('views',  path.join(__dirname , '/public'))
.set('trust proxy',true); 

// General
app
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(express.static('public'))

app.get("/", (req, res) => {
	res.sendFile('index.html')
});

app.post('/ip', (req, res) => {
	fetch(`https://ipinfo.io/${req.ip}/json?token=0467ce20890c84`)
	.then(res => res.json())
	.then(json => res.send(JSON.stringify(json)))
})

app.listen(8080);
util.log('Started Server.')
