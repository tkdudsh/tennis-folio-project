import express from "express";
import cors from "cors";
import cartRouter from "./routes/carts.js";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";
import styleRouter from "./routes/style.js";
import productRouter from "./routes/products.js";
import bestRouter from "./routes/best.js";
import hotRouter from "./routes/hot.js";
import detailRouter from "./routes/detail.js";
import cardListsRouter from "./routes/cardLists.js";
import kakaoRouter from "./routes/kakao.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/carts", cartRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use('/products', productRouter);
app.use("/api/best", bestRouter);
app.use("/api/hot", hotRouter);
app.use("/detail", detailRouter);
app.use("/cardLists", cardListsRouter);
app.use("/style", styleRouter);
app.use("/kakao",kakaoRouter);

app.listen(4000, () => {
	console.log(`Server is running on port 4000`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
