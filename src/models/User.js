// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32,
//         },
//         email: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32,
//             unique: true,
//         },
//         phone_number: {
//             type: String,
//             trim: true,
//             maxlength: 11,
//         },
//         hashed_password: {
//             type: String,
//             required: true,
//         },
//         about: {
//             type: String,
//             trim: true,
//         },
//         salt: String,
//         role: {
//             type: Number,
//             default: 0,
//         },
//         coursesId: [{ type: ObjectId, ref: "Course" }],
//         history: {
//             type: Array,
//             default: [],
//         },
//         pic: {
//             type: String,
//             default:
//                 "https://res.cloudinary.com/dhzbsq7fj/image/upload/v1643101647/avatardefault_92824_aifry9.png",
//         },
//         code: {
//             type: String,
//             trim: true,
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
