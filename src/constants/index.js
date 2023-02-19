import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const DEVELOPMENT_URL = process.env.DEVELOPMENT_URL || "http://localhost:4000/";
const PRODUCTION_URL = process.env.PRODUCTION_URL;
const SWAGGER_URL =
	process.env.SWAGGER_URL || "http://localhost:4000/api-docs/";

const QUERY_LIMIT_ITEM = 20;
const TRENDING_REDUCING_LIMIT_ITEM = 10;

export {
	PORT,
	DEVELOPMENT_URL,
	PRODUCTION_URL,
	SWAGGER_URL,
	QUERY_LIMIT_ITEM,
	TRENDING_REDUCING_LIMIT_ITEM
};
