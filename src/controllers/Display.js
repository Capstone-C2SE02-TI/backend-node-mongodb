const { getListOfCoins } = require("../services/crud-database/user")

function DisplayController() {
    this.getCoins = async (req, res, next) => {
        await getListOfCoins()
            .then((coinsList) => {
                return res
                    .status(200)
                    .json({ message: "Get list of coins successfully", coins: coinsList });
            })
            .catch((error) => {
                return res.status(400).json({
                    message: "Get list of coins failed with error: " + error,
                    coins: null,
                });
            });
    };
}

module.exports = new DisplayController();
