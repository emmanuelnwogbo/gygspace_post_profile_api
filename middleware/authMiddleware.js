const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

const User = mongoose.model("users");

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timestamp }, keys.cookieKey);
}

//user signing in to api for first time
exports.UserApiPermission = function(req, res, next) {
	const userid = req.body.userid;

	if (!userid) {
		return res.status(422).send({ error: "Invalid input" });
	}

	User.findOne({ _id: userid }, function(err, existingUser) {
		if (err) {
			//return next(err);
			res.send({ error: "unauthorised" });
		}

		if (existingUser) {
			//res.send(existingUser);
			let userToken = tokenForUser(existingUser);
			existingUser.userToken = userToken;
			existingUser.save();
			res.json({ token: userToken });
		}
	});
};
