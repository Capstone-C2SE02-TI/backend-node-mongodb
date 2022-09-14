const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const { accessTokenSecret, encodeAlgorithm, accessTokenHeaderExample } = require("./variables");

async function verifyToken(token, secretKey) {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        return undefined;
    }
};

const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        return undefined;
    }
};

const generateAccessToken = async (accessTokenData) => {
    try {
        const accessToken = await sign(accessTokenData, accessTokenSecret, {
            algorithm: encodeAlgorithm,
        });

        return accessToken;
    } catch (error) {
        return null;
    }
};

async function isAuthed(req, res, next) {
    const accessTokenHeader = req.headers.authorization;
    if (!accessTokenHeader) {
        return false;
    }

    const cookie = req.cookies.TI_AUTH_COOKIE;
    const decodeValue1 = await decodeToken(accessTokenHeader, accessTokenSecret);
    const decodeValue2 = await decodeToken(cookie, accessTokenSecret);

    if (!decodeValue1 || !decodeValue2) {
        return false;
    }

    if (decodeValue1.username !== decodeValue2.username) {
        return false
    }

    return true;
};

module.exports = {
    generateAccessToken,
    isAuthed,
    verifyToken,
    decodeToken,
};
