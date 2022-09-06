const { generateToken, verifyToken } = require("./methods");

async function generateAccessToken(accessTokenData) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

    const accessToken = await generateToken(
        accessTokenData,
        accessTokenSecret,
        accessTokenLife,
    );

    return accessToken;
}

async function isAuthed(req, res, next) {
    const accessTokenFromHeader = req.headers.x_authorization;

    if (!accessTokenFromHeader) {
        return res.status(401).send("Không tìm thấy access token!");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );

    if (!verified) {
        return res
            .status(401)
            .send("Bạn không có quyền truy cập vào tính năng này!");
    }

    // const user = await userModle.getUser(verified.payload.username);
    // req.user = user;

    return next();
}

module.exports = { generateAccessToken, isAuthed };
