import mongoose from "mongoose";
import { DEFAULT_USER_AVATARS } from "../constants/index.js";

const UserSchema = new mongoose.Schema(
	{
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
		email: {
			type: String,
			trim: true,
			default: ""
		},
		avatar: {
			type: String,
			trim: true,
			default:
				DEFAULT_USER_AVATARS[
					Math.floor(Math.random() * DEFAULT_USER_AVATARS.length)
				]
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
