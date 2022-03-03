import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import cors from "cors";
import session from "express-session";
import "./db";
import "./models/Videos";
import "./models/Users";

const PORT = 4000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 데이터는 쿠키 자체에 저장되지 않고 세션 ID에만 저장됩니다. 세션 데이터는 서버 측에 저장됩니다.
app.use(
  session({
    secret: "secret",
    resave: true, // 변경사항이 없어도 저장. request하는 동안 세션이 수정되지 않은 경우에도 세션이 세션 저장소에 다시 저장되도록 합니다.
    saveUninitialized: true, // 세션 초기화 전에도 저장. "초기화되지 않은" 세션을 저장소에 강제로 저장합니다.
  })
);

// https://stackoverflow.com/questions/38900537/typescript-extend-express-session-interface-with-own-class
declare module "express-session" {
  interface SessionData {
    user: object;
    loggedIn: boolean;
  }
}

// app.use((req, res, next) => {
//   // console.log(req.session);

//   // // 브라우저가 request할 때 같이 보내는 session id
//   // console.log(req.sessionID);

//   // console.log(req.body);

//   next();
// });

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
