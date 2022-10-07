require("dotenv").config();
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const {
	getUserByEmail,
	updateUserConfirmationCode,
} = require("../services/crud-database/user");
const { validateSubmitCodeBody } = require("../validators/user");
const { randomConfirmationCode } = require("../helpers");

const {
	GOOGLE_MAILER_CLIENT_ID,
	GOOGLE_MAILER_CLIENT_SECRET,
	GOOGLE_MAILER_REFRESH_TOKEN,
	ADMIN_EMAIL_ADDRESS,
	ADMIN_EMAIL_PASSWORD,
} = process.env;

const myOAuth2Client = new OAuth2Client(
	GOOGLE_MAILER_CLIENT_ID,
	GOOGLE_MAILER_CLIENT_SECRET,
);
myOAuth2Client.setCredentials({
	refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

function ForgotPasswordController() {
	// ==> ERROR
	this.submitEmail = async (req, res, next) => {
		try {
			const myAccessTokenObject = await myOAuth2Client.getAccessToken();
			const myAccessToken = myAccessTokenObject?.token;
			// 	"ya29.a0Aa4xrXPZ5LLUjxvtC3axmhxTO7OSHXYcHWXxKXm7qCnNOS3m_tClSxBYJz7jfFcBk9FFDw836nfEYGu-5lkjoaVvZX_-f3HVXQeNZF81zs-cX7Y5qgXLK5542oODky3sY8sHjEH9gtkudt7DbrLnoil_IAHhaCgYKATASARISFQEjDvL9GRNzLUoEQoYUjSanilgR3A0163";

			console.log("myAccessTokenObject:", myAccessTokenObject);

			const transport = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: ADMIN_EMAIL_ADDRESS,
					pass: ADMIN_EMAIL_PASSWORD,
					clientId: GOOGLE_MAILER_CLIENT_ID,
					clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
					refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
					accessToken: myAccessToken,
				},
			});

			const code = randomConfirmationCode();
			const html = `
            <div style="padding: 10px; background-color: #003375">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #0085ff">Your verification code is:</h4>
                    <span style="color: black">${code}</span>
                </div>
            </div>
        `;

			const mailOptions = {
				from: {
					name: "Tracking Investment's Support Team",
					address: ADMIN_EMAIL_ADDRESS,
				},
				to: req.body.email,
				subject: "Reset Password - Tracking Investment",
				html: html,
			};

			await transport.sendMail(mailOptions);

			res.status(200).json({ message: "SUCCESSFULLY" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "FAILED" });
		}
	};

	this.submitEmail2 = async (req, res, next) => {
		const user = await getUserByEmail(req.body.email);

		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env._0x072126sajkxja3181sc33242315_,
				pass: process.env._0x073126sajkxja3112lkkjs83j22_,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const code = randomConfirmationCode();
		const html = `
            <div style="padding: 10px; background-color: #003375">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #0085ff">Your verification code is:</h4>
                    <span style="color: black">${code}</span>
                </div>
            </div>
        `;

		const mailOptions = {
			from: {
				name: "Tracking Investor's Support Team",
				address: process.env._0x072126sajkxja3181sc33242315_,
			},
			to: req.body.email,
			subject: "Verify code to create new password - TI Team",
			html: html,
		};

		transporter.sendMail(mailOptions, async (error, info) => {
			if (!error) {
				if (user) {
					const updatedUser = await updateUserConfirmationCode(
						user.docId,
						code,
					);

					if (updatedUser) {
						return res.status(200).json({
							message:
								"Submit email successfully. Please check your email",
						});
					} else {
						return res.json({
							message: "Submit email failed",
						});
					}
				} else {
					return res.json({ message: "Email not found" });
				}
			} else {
				return res
					.status(400)
					.json({ message: "Submit email failedd" });
			}
		});
	};

	// ==> DONE
	this.submitCode = async (req, res, next) => {
		// Validate request body
		const { status, error } = await validateSubmitCodeBody(req, res, next);

		if (status === "failed") {
			return res.status(400).json({ message: error });
		} else {
			const { email, code } = req.body;
			const user = await getUserByEmail(email);

			if (code === user.confirmationCode) {
				return res.status(200).json({ message: "Correct code" });
			} else {
				return res.status(400).json({ message: "Wrong code" });
			}
		}
	};

	// ==> TODO
	this.resendCode = (req, res, next) => {
		// const transporter = nodemailer.createTransport({
		//     host: "smtp.gmail.com",
		//     port: 465,
		//     secure: true,
		//     auth: {
		//         user: process.env._0x072126sajkxja3181sc33242315_,
		//         pass: process.env._0x073126sajkxja3112lkkjs83j22_,
		//     },
		//     tls: {
		//         rejectUnauthorized: false,
		//     },
		// });
		// const code = randomConfirmationCode();
		// const html = `
		//     <div style="padding: 10px; background-color: #003375">
		//         <div style="padding: 10px; background-color: white;">
		//             <h4 style="color: #0085ff">Your verification code is:</h4>
		//             <span style="color: black">${code}</span>
		//         </div>
		//     </div>
		// `;
		// const mainOptions = {
		//     from: {
		//         name: "LOP's Support Team",
		//         address: "baop38391@gmail.com",
		//     },
		//     to: req.body.email,
		//     subject: "Verify code to create new password - LOP",
		//     html: html,
		// };
		// transporter.sendMail(mainOptions, (err, info) => {
		//     if (!err) {
		//         // Lưu code vào DB
		//         User.findOne({ email: req.body.email }, (error, user) => {
		//             if (user) {
		//                 console.log(user);
		//                 user.updateOne({ code: code }, (error, updatedUser) => {
		//                     console.log(user);
		//                     if (updatedUser) {
		//                         return res.json({
		//                             message:
		//                                 "Re-send code success. Please check your email",
		//                         });
		//                     } else {
		//                         return res.json({ message: "Re-send code failed" });
		//                     }
		//                 });
		//             } else {
		//                 return res.json({ message: "Re-send code failed" });
		//             }
		//         });
		//     } else {
		//         return res.json({ message: "Re-send code failed" });
		//     }
		// });
		// return res.status(200).json({ message: "Successfully" });
	};

	// ==> TODO
	this.createNewPassword = (req, res, next) => {
		// User.findOne({ email: req.body.email }, (error, user) => {
		//     // Nếu user đó tồn tại
		//     if (user) {
		//         // Tạo 1 User mới chứa thông tin của user cũ và password mới
		//         const updatedUserInfo = new User({
		//             ...user._doc,
		//             password: req.body.newPassword,
		//         });
		//         // Cập nhật mật khẩu mới
		//         user.updateOne(updatedUserInfo, (error, updatedUser) => {
		//             if (updatedUser) {
		//                 return res.json({ message: "Create new password success" });
		//             } else {
		//                 return res.json({ message: "Create new password failed" });
		//             }
		//         });
		//     } else {
		//         return res.json({ message: "Create new password failed" });
		//     }
		// });
		// return res.status(200).json({ message: "Successfully" });
	};
}

module.exports = new ForgotPasswordController();
