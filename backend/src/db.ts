import mongoose from "mongoose";

const local = false;
let address;

local ? (address = "127.0.0.1") : (address = "mongodb-container");

mongoose.connect(`mongodb://${address}:27017/clone_tube`);

const db = mongoose.connection;

const handleOpen = () => console.log("Success : Connected to DB");
const handleError = (error: any) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
