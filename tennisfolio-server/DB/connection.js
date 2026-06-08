import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
	host: process.env.DB_HOST || "mysql1.c3280mk20lzj.ap-northeast-2.rds.amazonaws.com",
	user: process.env.DB_USER || "admin",
	password: process.env.DB_PASSWORD, //password의 경우 공개가 되면 큰일이 날 수 있기에 추가적으로 작성하지 않음.
	database: process.env.DB_NAME || "tennisfolio",
});

//DB connect test
pool
	.getConnection()
	.then((conn) => console.log("✅ mysql 연결 성공")) // 요청이 성공했을 경우 실행이 되는 구문
	.catch((err) => console.log("❌ mysql 연결 실패", err)); // 서버가 닫혀있거나, 비번이 틀렸을 ... 경우 실행 되는 구문

export default pool;
