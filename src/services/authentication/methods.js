const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

// Turn Callback to Promise.
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

async function generateToken(payload, secretSignature, tokenLife) {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
        );
    } catch (error) {
        return { error: "Error in generate access token" };
    }
}

async function verifyToken(token, secretKey) {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        return { error: "Error in verify access token" };
    }
}

async function decodeToken(token, secretKey) {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        return { error: "Error in decode access token" };
    }
}

module.exports = { generateToken, verifyToken, decodeToken };
