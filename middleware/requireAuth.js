const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("users");

const findUserByToken = (req, res, next) => {
	const userToken = req.body.userAuthTok;
	User.findOne({ userToken }).then(user => {
		if (!user) {
			return res.status(404).send();
		}

		console.log(user);
		next();
	});
};

module.exports = { findUserByToken };
