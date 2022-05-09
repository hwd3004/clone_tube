import mongoose from "mongoose";

const local = false;

let uri;

if (local) {
  uri = `mongodb://127.0.0.1:27017/clone_tube`;
} else {
  uri = `mongodb://mongodb-container:27017/clone_tube`;
}

mongoose.connect(uri);

const db = mongoose.connection;

const handleOpen = () => console.log("Success : Connected to DB");
const handleError = (error: any) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
