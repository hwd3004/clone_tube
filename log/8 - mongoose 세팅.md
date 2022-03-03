```javascript
// src/db.ts
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/clone_tube");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error: any) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
```

```javascript
// src/index.ts
// index.ts에 임포트하고 서버를 재시작하면 몽고db에 새 데이터베이스가 생성된다

// ...
import "./db";
// ...
```

```javascript
// 스키마 생성하기
// src/models/Video.ts
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
```

```javascript
// src/index.ts
// db.ts를 index.ts에 임포트한 것처럼, 스키마 파일을 index.ts에 임포트하면 몽고db에 컬렉션이 자동으로 생성된다

// ...
import "./models/Videos";
// ...
```
