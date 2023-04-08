import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		userId: {
			type: Number,
			unique: true
		},
		walletAddress: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		fullName: {
			type: String,
			trim: true,
			default: ""
		},
		avatar: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/dhzbsq7fj/image/upload/v1643101647/avatardefault_92824_aifry9.png"
		},
		website: {
			type: String,
			trim: true,
			default: ""
		},
		premiumAccount: {
			type: Boolean,
			default: false
		},
		sharksFollowed: {
			type: Array,
			default: []
		},
		addedSharks: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
