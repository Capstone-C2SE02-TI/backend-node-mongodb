const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const { getUserByUsername } = require("../../services/crud-database/user");
const { accessTokenSecret, encodeAlgorithm, accessTokenHeaderExample } = require("./variables");

async function verifyToken(token, secretKey) {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        return undefined;
    }
}

async function decodeToken(token, secretKey) {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        return undefined;
    }
}

async function generateAccessToken(accessTokenData) {
    try {
        const accessToken = await sign(accessTokenData, accessTokenSecret, {
            algorithm: encodeAlgorithm,
        });

        return accessToken;
    } catch (error) {
        return null;
    }
}

async function isAuthed(req, res, next) {
    const accessTokenHeader = req.headers.x_authorization || accessTokenHeaderExample;
    console.log("accessTokenHeader:", accessTokenHeader);

    if (!accessTokenHeader) {
        return false;
    }

    const verified = await decodeToken(accessTokenHeader, accessTokenSecret);

    if (!verified) {
        return false;
    }

    // const user = await getUserByUsername(verified.username);
    // req.user = user;

    return true;
}

module.exports = {
    generateAccessToken,
    isAuthed,
    verifyToken,
    decodeToken,
};
