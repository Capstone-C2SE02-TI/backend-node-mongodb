const _ = require('lodash');
const { getListOfCoins } = require("../services/crud-database/user")

function DisplayController() {
    this.getCoins = async (req, res, next) => {
        const pageQuery = Math.floor(_.toNumber(req.query.page));
        const page = pageQuery >= 1 ? pageQuery : 1

        await getListOfCoins(page)
            .then((coinsList) => {
                return res
                    .status(200)
                    .json({
                        message: "successfully",
                        page: page,
                        coinsLength: coinsList.length,
                        coins: coinsList
                    });
            })
            .catch((error) => {
                return res.status(400).json({
                    message: "failed",
                    error: error,
                    coins: null,
                });
            });
    };
}

module.exports = new DisplayController();
