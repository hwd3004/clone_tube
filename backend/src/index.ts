require("dotenv").config();
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db";
import "./models/Videos";
import "./models/Users";
import compression from "compression";
import fileUpload from "express-fileupload";

const PORT = process.env.PORT;

const app = express();

// 세션 데이터는 쿠키 자체에 저장되지 않고 세션 ID에만 저장됩니다. 세션 데이터는 서버 측에 저장됩니다.
// app.use(
//   session({
//     secret: "secret",
//     resave: false, // 재저장을 계속 할 것인지 정보, 세션에 변화가 없어도 계속 저장한다는 옵션이다.(false 권장)
//     saveUninitialized: false, // True일 경우 세션 저장 전 unitialized 상태로 미리 저장한다
//     cookie: {},
//     store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/clone_tube" }),
//   })
// );

app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:8000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// https://stackoverflow.com/questions/38900537/typescript-extend-express-session-interface-with-own-class
declare module "express-session" {
  interface SessionData {
    user: object;
    loggedIn: boolean;
  }
}

// app.use((req, res, next) => {
//   res.locals.loggedIn = req.session.loggedIn;
//   res.locals.user = req.session.user;
//   res.locals.siteName = "clone_tube";

//   next();
// });

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
