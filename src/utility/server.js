require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const app = require("express")();

app.disable("x=powered=by");
app.use(cors());
app.use(helmet());
app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
	app
};