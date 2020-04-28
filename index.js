// General modules
const util = require('./modules/util.js'),
	
	// Express
	express = require("express"),
	app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
	res.sendFile('index.html')
});

app.listen(8080);
util.log('Started Server.')
