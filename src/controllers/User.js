const _ = require('lodash');
const { QUERY_LIMIT_ITEM } = require("../constants");
const { getListOfUsers, getUsersLength } = require("../services/crud-database/admin");

function UserController() {
    this.getlist = async (req, res, next) => {
        // if (!req.query.page) {
        //     // page = 1
        // }
        const pageQuery = Math.floor(_.toNumber(req.query.page));

        const page = pageQuery >= 1 ? pageQuery : 1

        const usersLength = await getUsersLength();

        await getListOfUsers(page)
            .then((usersList) => {
                if (usersList.length == 0) {
                    return res.status(400)
                        .json({
                            message: "failed-pageindex-invalid",
                            page: page,
                            totalPage: Math.ceil(usersLength / QUERY_LIMIT_ITEM),
                            datasLength: 0,
                            datas: []
                        });
                } else {
                    return res.status(200)
                        .json({
                            message: "successfully",
                            page: page,
                            totalPage: Math.ceil(usersLength / QUERY_LIMIT_ITEM),
                            datasLength: usersList.length,
                            datas: usersList
                        });
                }
            })
            .catch((error) => {
                return res.status(400)
                    .json({
                        message: "failed",
                        error: error,
                        datas: null,
                    });
            });
    };
}

module.exports = new UserController();
