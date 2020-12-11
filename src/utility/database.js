require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const {
	CONNECTION_STRING,
} = process.env;

/**
 * Open a new Mongodb connection pool
 * @param {string} collection
 */
const connect = async () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(client => {
			return resolve(client);
		}).catch(error => reject(error));
	});
};

module.exports = connect;