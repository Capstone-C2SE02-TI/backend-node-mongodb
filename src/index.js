import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import cookieParse from "cookie-parser";
import routing from "./routes/index.js";
import connectDatabase from "./configs/connectDatabase/index.js";
import { swaggerSpecs } from "./configs/swagger/index.js";
import { PORT, HOST_URL, SWAGGER_URL } from "./constants/index.js";
import { Server, Socket } from "socket.io";
import http from "http";
import {
	getListOfSharkFollowed,
	getNewTransactions
} from "./services/crudDatabase/user.js";
import InvestorModel from "./models/Investor.js";

const app = express();
dotenv.config();

// Config Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

connectDatabase();
routing(app);

app.listen(PORT, () => {
	console.log(`Server is listening at ${HOST_URL}`);
	console.log(`API Documentation: ${SWAGGER_URL}`);
});

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

server.listen(4001, () => {
	console.log(`Server is listening at 4001`);
});

let walletAddress = null;
let listSharkFollowed = [];

io.on("connection", async function (socket) {
	// console.log("Someone connected");

	socket.on("get-wallet-address", async (address) => {
		if (address !== null) {
			walletAddress = address;
			console.log("global", walletAddress);

			listSharkFollowed = await getListOfSharkFollowed(walletAddress);
		}
	});
});

// listSharkFollowed = await getListOfSharkFollowed(walletAddress);

InvestorModel.watch([
	{ $match: { operationType: { $in: ["insert", "update"] } } }
]).on("change", async (data) => {
	if (walletAddress !== null) {
		for (var shark of listSharkFollowed.datas) {
			const newTransactions = await getNewTransactions(shark.sharkId);
			
			if (newTransactions.transactionsHistory.length > 0){
				io.emit("new-transactions", {
					newTransactions: newTransactions,
					sharkId: shark.sharkId
				});
			}
				
		}
	}
});
