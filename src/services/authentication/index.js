const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        return { error: "Error in verify access token" };
    }
};

const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        return { error: "Error in decode access token" };
    }
};

const generateAccessToken = async (accessTokenData) => {
    try {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

        const accessToken = await sign(
            {
                payload: accessTokenData,
            },
            accessTokenSecret,
            {
                algorithm: "HS256",
                expiresIn: accessTokenLife,
            },
        );

        return accessToken;
    } catch (error) {
        return null;
    }
};

const isAuthed = async (req, res, next) => {
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
};

module.exports = {
    generateAccessToken,
    isAuthed,
    verifyToken,
    decodeToken,
};
