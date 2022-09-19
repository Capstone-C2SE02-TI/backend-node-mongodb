const _ = require('lodash');
const { getListOfUsers, getUsersLength } = require("../services/crud-database/admin");

function UserController() {
    this.getlist = async (req, res, next) => {
        const QUERY_LIMIT_ITEM = 100;

        const pageQuery = Math.floor(_.toNumber(req.query.page));

        const page = pageQuery >= 1 ? pageQuery : 1

        const usersLength = await getUsersLength();

        await getListOfUsers(page)
            .then((usersList) => {
                return res.status(200)
                    .json({
                        message: "successfully",
                        page: page,
                        totalPage: Math.ceil(usersLength / QUERY_LIMIT_ITEM),
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
