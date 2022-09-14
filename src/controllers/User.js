const firebase = require("firebase-admin");
const { getListOfUsers } = require("../services/crud-database/user");

function UserController() {
    this.getlist = async (req, res, next) => {
        await getListOfUsers()
            .then((usersList) => {
                return res
                    .status(200)
                    .json({ message: "Get list of users successfully", users: usersList });
            })
            .catch((error) => {
                return res.status(400).json({
                    message: "Get list of users failed with error: " + error,
                    users: null,
                });
            });
    };
}

module.exports = new UserController();
