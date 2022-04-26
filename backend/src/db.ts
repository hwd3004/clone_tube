import mongoose from "mongoose";

const local = true;
let address;

local ? (address = "127.0.0.1") : (address = "172.18.0.2");

mongoose.connect(`mongodb://${address}:27017/clone_tube`);

const db = mongoose.connection;

const handleOpen = () => console.log("Success : Connected to DB");
const handleError = (error: any) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
