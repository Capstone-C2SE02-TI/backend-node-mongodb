const _ = require('lodash');
const { getListOfUsers } = require("../services/crud-database/user");

function UserController() {
    this.getlist = async (req, res, next) => {
        const pageQuery = Math.floor(_.toNumber(req.query.page));
        const page = pageQuery >= 1 ? pageQuery : 1

        await getListOfUsers(page)
            .then((usersList) => {
                return res.status(200)
                    .json({
                        message: "successfully",
                        page: page,
                        usersLength: usersList.length,
                        users: usersList
                    });
            })
            .catch((error) => {
                return res.status(400)
                    .json({
                        message: "failed",
                        error: error,
                        users: null,
                    });
            });
    };
}

module.exports = new UserController();
