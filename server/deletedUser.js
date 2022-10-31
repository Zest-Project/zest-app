const User = require("./models/user");

const username = "DeletedUser";

async function create() {
    if (!await User.exists({ username: username })) {
        await User.create({
            email: " ",
            username: username,
            password: " ",
            public: false
        });
    }
}

module.exports = {create, username};