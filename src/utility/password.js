require('dotenv').config();
const bcrypt = require('bcrypt');

const { SALT } =  process.env;

const hash = string => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(`${string}${SALT}`, 10, (err, hash) => {
			if (err) return reject(err);
            return resolve(hash);
        });
    });
};

const compare = (string, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(`${string}${SALT}`, hash, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports = {
    hash,
    compare
}