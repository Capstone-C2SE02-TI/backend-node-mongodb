const database = require("../../configs/connect-database");
const { randomFirestoreDocumentId } = require("../../helpers");

const getUserByUsername = async (username) => {
    let user;

    const users = await database
        .collection("users")
        .where("username", "==", username)
        .get();

    users.forEach((doc) => {
        user = doc.data();
        user.docId = doc.id;
    });

    return user;
};

const getUserByEmail = async (email) => {
    let user;

    const users = await database
        .collection("users")
        .where("email", "==", email)
        .get();

    users.forEach((doc) => {
        user = doc.data();
        user.docId = doc.id;
    });

    return user;
};

const createNewUser = async (newUser) => {
    const docId = randomFirestoreDocumentId();
    await database.collection("users").doc(docId).set(newUser);
};

const updateUserConfirmationCode = async (docId, code) => {
    const user = database.collection("users").doc(docId);

    await user.update({ confirmationCode: code });

    return user;
};

const checkExistedUsername = async (username) => {
    isExistedUsername = false;

    const users = await database.collection("users").get();
    users.forEach((doc) => {
        if (doc.get("username") === username) {
            isExistedUsername = true;
        }
    });

    return isExistedUsername;
};

const checkExistedEmail = async (email) => {
    isExistedEmail = false;

    const users = await database.collection("users").get();
    users.forEach((doc) => {
        if (doc.get("email") === email) {
            isExistedEmail = true;
        }
    });

    return isExistedEmail;
};

const getPasswordByUsername = async (username) => {
    let hashPassword;

    const users = await database
        .collection("users")
        .where("username", "==", username)
        .get();

    users.forEach((doc) => {
        hashPassword = doc.get("password");
    });

    return hashPassword;
};

module.exports = {
    getUserByUsername,
    getUserByEmail,
    createNewUser,
    updateUserConfirmationCode,
    checkExistedUsername,
    checkExistedEmail,
    getPasswordByUsername,
};
