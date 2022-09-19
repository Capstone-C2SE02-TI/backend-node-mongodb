const database = require("../../configs/connect-database");

const getListOfUsers = async (page = 1) => {
    let usersList = [];

    const QUERY_LIMIT_ITEM = 100;

    const startIndex = page === 1 ? 1 : (page * QUERY_LIMIT_ITEM) + 1

    const users = await database.collection("users")
        .orderBy("userId", "asc")
        .startAt(startIndex)
        .limit(QUERY_LIMIT_ITEM)
        .get();

    users.forEach((doc) => {
        usersList.push(doc.data());
    });

    return usersList;
}

const getUsersLength = async () => {
    let usersLength = 0;

    const users = await database.collection("users").get();

    users.forEach((doc) => usersLength++);

    return usersLength;
}

module.exports = {
    getListOfUsers,
    getUsersLength
};
