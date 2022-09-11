const database = require("../../configs/connect-database");
const { randomFirestoreDocumentId } = require("../../helpers");

async function getUserByUsername(username) {
    let user;
    const users = await database.collection("users").where("username", "==", username).get();

    users.forEach((doc) => {
        user = doc.data();
    });

    return user;
}

async function createNewUser(newUser) {
    const docId = randomFirestoreDocumentId();
    await database.collection("users").doc(docId).set(newUser);
}

async function checkExistedUsername(username) {
    isExistedUsername = false;

    const users = await database.collection("users").get();
    users.forEach((doc) => {
        if (doc.get("username") === username) {
            isExistedUsername = true;
        }
    });

    return isExistedUsername;
}

async function checkExistedEmail(email) {
    isExistedEmail = false;

    const users = await database.collection("users").get();
    users.forEach((doc) => {
        if (doc.get("email") === email) {
            isExistedEmail = true;
        }
    });

    return isExistedEmail;
}

async function getPasswordByUsername(username) {
    let hashPassword;

    const users = await database.collection("users").where("username", "==", username).get();

    users.forEach((doc) => {
        hashPassword = doc.get("password");
    });

    return hashPassword;
}

module.exports = {
    getUserByUsername,
    createNewUser,
    checkExistedUsername,
    checkExistedEmail,
    getPasswordByUsername,
};
