const mongoose = require("mongoose");

const Profile = mongoose.model("profiles");

module.exports = (req, res, next) => {
	res.send("got you");
};
