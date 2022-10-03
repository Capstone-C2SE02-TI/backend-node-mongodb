const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    }
);

module.exports = mongoose.model("Test", testSchema);