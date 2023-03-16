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
