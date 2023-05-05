import mongoose from "mongoose";

let InvestorSchema = new mongoose.Schema(
	{
		sharkId: {
			type: Number,
			require: true
		},
		isShark: {
			type: Boolean,
			default: false
		},
		coins: {
			type: Object,
			default: {}
		},
		totalAssets: {
			type: String,
			default: "0"
		},
		totalValueOut: {
			type: String,
			default: "0"
		},
		totalValueIn: {
			type: String,
			default: "0"
		},
		percent24h: {
			type: Number,
			default: 0
		},
		transactionsHistory: {
			type: Array,
			default: []
		},
		walletAddress: {
			type: String,
			default: "",
			unique: true
		},
		cryptos: {
			type: Array,
			default: []
		},
		historyDatas: {
			type: Array,
			default: []
		},
		followers: {
			type: Array,
			default: []
		}
	},
	{ versionKey: false }
);

const InvestorModel = mongoose.model("Investor", InvestorSchema);
export default InvestorModel;
