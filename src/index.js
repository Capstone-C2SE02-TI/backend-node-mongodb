import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParse from "cookie-parser";
import routing from "./routes/index.js";
import connectDatabase from "./configs/connectDatabase/index.js";
import { DEVELOPMENT_URL, PRODUCTION_URL } from "./constants/index.js";

const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();

// Config Swagger
const swaggerOptions = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "SwaggerUI",
			version: "1.0.0",
			description: "A simple Express Library API"
		},
		servers: [
			{
				url: DEVELOPMENT_URL,
				description: "Development"
			},
			{
				url: PRODUCTION_URL,
				description: "Production"
			}
		]
	},
	apis: ["**/*.yaml"]
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
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
	console.log(`Server is listening at http://localhost:${PORT}/`);
	console.log(`API Documentation: http://localhost:${PORT}/api-docs/`);
});
