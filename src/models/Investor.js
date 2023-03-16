import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

const InvestorSchema = new mongoose.Schema(
	{
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

InvestorSchema.plugin(AutoIncrement, { inc_field: "sharkId" });

const InvestorModel = mongoose.model("Investor", InvestorSchema);
export default InvestorModel;
