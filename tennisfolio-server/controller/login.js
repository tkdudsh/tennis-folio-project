import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as repository from "../repository/login.js";

export const getLogin = async (req, res, next) => {
	const { id, pwd } = req.body;
	const pwdHash = await repository.getPassword(id);

	console.log(` 로그인 시도: 아이디=${id}, 비밀번호=${pwd}`);

	try {
		if (!pwdHash) {
			res.json({ isLogin: false });
		} else {
			const isLogin = await bcrypt.compare(pwd, pwdHash.pwd); //pwdHash = {"pwd": ~~}
			let token = "";
			if (isLogin) {
				//로그인 인증 - jwttoken
				token = await jwt.sign({ id }, "secret", { expiresIn: "7d" });
			}
			console.log("token--> ", token);

			res.json({ isLogin, token, role: pwdHash.role });
		}
	} catch (error) {}

	// return res.json({
	// 	isLogin: true,
	// 	token: token,
	// 	role: "user",
	// });
};
