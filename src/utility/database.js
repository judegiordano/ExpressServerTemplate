require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const { CONNECTION_STRING, DATABASE } = process.env;

const connect = collection => {
	// return pernding connection
	return new Promise((resolve, reject) => {
		MongoClient.connect(CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(client => {
			// connect to db
			const db = client.db(DATABASE);
			console.log(`connected to ${DATABASE}:${collection}`);
			// return specific collection
			return resolve(db.collection(collection));
		}).catch(error => reject(error));
	});
};

module.exports = {
	connect
};