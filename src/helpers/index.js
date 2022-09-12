const _ = require("lodash");
const bcrypt = require("bcrypt");

const randomConfirmationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

function randomFirestoreDocumentId() {
    const validCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
            "",
        );
    const length = 20;
    return _.sampleSize(validCharacters, length).join("");
}

function cryptPassword(password, callback) {
    bcrypt.genSalt(10, function (error, salt) {
        if (error) return callback(error);

        bcrypt.hash(password, salt, function (error, hashPassword) {
            return callback(error, hashPassword);
        });
    });
}

function comparePassword(plainPassword, hashPassword, callback) {
    bcrypt.compare(
        plainPassword,
        hashPassword,
        function (error, isPasswordMatch) {
            return error == null
                ? callback(null, isPasswordMatch)
                : callback(error);
        },
    );
}

module.exports = {
    randomConfirmationCode,
    randomFirestoreDocumentId,
    cryptPassword,
    comparePassword,
};
