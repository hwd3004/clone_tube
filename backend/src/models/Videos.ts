import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  fileUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

// https://mongoosejs.com/docs/middleware.html#middleware
// mongoose middleware
//
// findByIdAndUpdate()에서는 save 훅업이 발생하지 않음
// svae != update
//
// videoSchema.pre("save", async function () {
//   // console.log("this : ", this);

//   // console.log(this.hashtags);
//   // hashtags: [ '#dummy hashtags', '#asd', '#qwe' ],

//   console.log("this : ", String(this.hashtags));

//   this.hashtags = String(this.hashtags)
//     .split(",")
//     .map((word: string) => (word.startsWith("#") ? word : `#${word.trim()}`));
// });

//
//
//

// https://mongoosejs.com/docs/guide.html#statics
// 모델에 static 함수를 추가할 수도 있습니다.
// 스키마에서 컴파일된 모델에 정적 "class" 메서드를 추가합니다.
// https://millo-l.github.io/Typescript-mongodb-method-statics-사용하기/
//
// videoSchema.static("formatHahtags", function (hashtags: string) {
//   return hashtags.split(",").map((word) => {
//     if (word.startsWith("#")) {
//       return word;
//     } else {
//       return `#${word.trim()}`;
//     }
//   });
// });

const Video = mongoose.model("Video", videoSchema);
export default Video;
