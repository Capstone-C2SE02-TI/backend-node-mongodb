import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const ObjectId = mongoose.Types.ObjectId;

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 4001;
export const NODE_ENV = process.env.NODE_ENV;
export const DEVELOPMENT_URL = `http://localhost:${PORT}`;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;
export const HOST_URL =
	NODE_ENV === "development" ? DEVELOPMENT_URL : PRODUCTION_URL;
export const SWAGGER_URL = `${HOST_URL}/api-docs/`;

export const QUERY_LIMIT_ITEM = 20;
export const TRENDING_REDUCING_LIMIT_ITEM = 10;

export const DEFAULT_USER_AVATARS = [
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F1.png?alt=media&token=d892f937-d3c3-4de4-a0ed-a16cd0e98fc7",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F2.png?alt=media&token=93ed3bf1-67aa-45ae-a7d7-b5a96e6a06d5",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F3.jpg?alt=media&token=c4134351-1fd8-4c9a-9e9d-cc72ee4a47e3",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F4.png?alt=media&token=986ae50f-448f-4e8f-9087-ed59eb93cf9a",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F5.jpg?alt=media&token=496669d9-04be-4a8f-b5a4-aa4544970ef8",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F6.jpg?alt=media&token=d0b74b95-525b-4c8e-83c5-92731903cf09",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F7.png?alt=media&token=f4ab75d7-7591-4640-b5c7-492e100b8859",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F8.jpg?alt=media&token=cf054616-83fe-42a4-b45f-8aa495c47d82",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F9.png?alt=media&token=3056d3ca-82a2-420d-911d-994bd8257f15",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F10.png?alt=media&token=115bf6f3-03ea-46b3-a9e7-8b9fe87c40ef",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F11.jpg?alt=media&token=4095e6e6-f922-414a-b601-306dec2bb940",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F12.png?alt=media&token=5a73295d-fb57-4d0f-a5e5-a7ff59bd17a6",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F13.png?alt=media&token=8be71c97-4aaa-491b-bc96-c02c2bd1fdd2",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F14.jpg?alt=media&token=5ccde66a-7276-4485-a0ca-58ad214fbb6e",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F15.png?alt=media&token=d56070c5-58e8-45e7-bae3-bd764feaa5e6",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F16.jpg?alt=media&token=f998de1b-818b-4589-9496-2af998149f34",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F17.jpg?alt=media&token=150d165b-fc43-48cd-92e6-dda80e537b4c",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F18.png?alt=media&token=33887a84-5369-4dc4-8ffb-ffab1f54b098",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F19.png?alt=media&token=3241342c-ffd4-4e4e-bd19-1025f968d164",
	"https://firebasestorage.googleapis.com/v0/b/ego-project-e6a03.appspot.com/o/TI-default-avatars%2F20.png?alt=media&token=d3b52e73-98d1-48cd-aafa-6d67dcdd4a96"
];