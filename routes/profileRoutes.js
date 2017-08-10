const addProfile = require("../middleware/addProfile");
const authMiddleware = require("../middleware/authMiddleware");
const { findUserByToken } = require("../middleware/requireAuth");

module.exports = app => {
	app.post("/user_current_user/user", authMiddleware.UserApiPermission);
	app.post("/profile/new", findUserByToken, addProfile);
};
