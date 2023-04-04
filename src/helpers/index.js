import _ from "lodash";
import bcrypt from "bcrypt";
import crypto from "crypto";

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);

const iv = crypto.randomBytes(16);

export const randomConfirmationCode = () => {
	const code = Math.floor(100000 + Math.random() * 900000);
	return code.toString();
};

export const encryptWalletAddress = (walletAddress) => {
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(walletAddress);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decryptWalletAddress = (encryptedData) => {
	const ivDecrypt = Buffer.from(iv.toString("hex"), "hex");
	const encryptedText = Buffer.from(encryptedData, "hex");

	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivDecrypt);

	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted;
};

export const compareWalletAddress = (plainAddress, hashAddress, callback) => {
	bcrypt.compare(plainAddress, hashAddress, (error, isAddressMatch) => {
		return error == null ? callback(null, isAddressMatch) : callback(error);
	});
};

export const cryptWalletAddress = (password, callback) => {
	bcrypt.genSalt(10, (error, salt) => {
		if (error) return callback(error);

		bcrypt.hash(password, salt, (error, hashPassword) => {
			return callback(error, hashPassword);
		});
	});
};

export const cryptPassword = (password, callback) => {
	bcrypt.genSalt(10, (error, salt) => {
		if (error) return callback(error);

		bcrypt.hash(password, salt, (error, hashPassword) => {
			return callback(error, hashPassword);
		});
	});
};

export const comparePassword = (plainPassword, hashPassword, callback) => {
	bcrypt.compare(plainPassword, hashPassword, (error, isPasswordMatch) => {
		return error == null ? callback(null, isPasswordMatch) : callback(error);
	});
};

export const convertUnixTimestampToNumber = (unixTimestamp) => {
	const date = new Date(unixTimestamp * 1000);

	const year =
		date.getFullYear() < 10
			? "0" + date.getFullYear()
			: "" + date.getFullYear();
	const month =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: "" + (date.getMonth() + 1);
	const day = date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
	const hour =
		date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours();
	const minute =
		date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes();
	const second =
		date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds();

	const formattedTimeStr = `${year}${month}${day}${hour}${minute}${second}`;
	const formattedTimeNumber = Number(formattedTimeStr);

	return formattedTimeNumber;
};
