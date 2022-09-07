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
        return false;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );

    if (!verified) {
        return false;
    }

    return true;
}

module.exports = { generateAccessToken, isAuthed };
