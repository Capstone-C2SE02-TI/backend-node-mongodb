import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
	{
		id: { type: String, required: true},
		seq: { type: Number, default: 0 }
	},
	{ versionKey: false }
);

const CounterModel = mongoose.model("Increaseid", CounterSchema);
export default CounterModel;
